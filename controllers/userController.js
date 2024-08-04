const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { fname, lname, email, phone, password } = req.body;

        const user = new User({ fname, lname, email, phone, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ success: false, error: errors });
        }

        if (err.code && err.code === 11000) {
            return res.status(400).json({ success: false, error: 'User Already Exists' });
        }

        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        // Update the user with the new data
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });
        await user.save();
        
        res.json(user);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ success: false, error: errors });
        }

        if (err.code && err.code === 11000) {
            return res.status(400).json({ success: false, error: 'User Already Exists' });
        }

        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        res.json(user);
    } catch (err) {

        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        res.json({ success: true, message: 'User deleted' });
    } catch (err) {

        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

        const count = await User.countDocuments();
        res.json({
            users,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
