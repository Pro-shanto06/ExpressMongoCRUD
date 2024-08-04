const express = require('express');
const {
    createUser,
    updateUser,
    getUserById,
    deleteUser,
    getUsers
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

module.exports = router;
