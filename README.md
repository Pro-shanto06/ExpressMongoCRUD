# Node.js User Management API

## Overview
This project is a RESTful API built with Node.js, Express, and MongoDB for managing users. It provides functionality for creating, updating, retrieving, and deleting user data, along with pagination for listing users.

## Features
- Create a user with validation for names, email, phone, and password.
- Update user information.
- Retrieve user details by ID.
- Delete a user by ID.
- List users with pagination.
  
## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- dotenv
- validator

## Installation
Clone the repository:
1. **Clone the repository:**
  ```bash
  git clone https://github.com/Pro-shanto06/ExpressMongoCRUD
  cd ExpressMongoCRUD
   ```


2. **Install dependencies:**

```bash
npm install
 ```
3. **Set up environment variables:**

Create a .env file in the root directory and add the following:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/ExpressMongoCRUD
 ```

4. **Start the server:**

```bash
node server.js
```

## API Endpoints

**Create a User**
URL: /users

Method: POST

Body:
```bash
{
    "fname": "Proshanto",
    "lname": "Saha",
    "email": "proshanto@gmail.com",
    "phone": "01717777777",
    "password": "Password123!"
}
```
Response:
```bash
{
    "success": true,
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fname": "Proshanto",
        "lname": "Saha",
        "email": "proshanto@gmail.com",
        "phone": "01717777777",
        "userType": "user",
        "status": "active",
        "createdAt": "2024-07-21T16:06:23.761Z",
        "updatedAt": "2024-07-21T16:06:23.761Z"
    }
}
```

**Update a User**
URL: /users/:id

Method: PUT

Body:

```bash
{
    "fname": "Abir"
}
```

Response:
```bash
{
    "success": true,
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fname": "Abir",
        "lname": "Saha",
        "email": "proshanto@gmail.com",
        "phone": "01717777777",
        "userType": "user",
        "status": "active",
        "createdAt": "2024-07-21T16:06:23.761Z",
        "updatedAt": "2024-07-21T16:06:23.761Z"
    }
}
```

**Get User by ID**
URL: /users/:id

Method: GET

Response:
```bash
{
    "success": true,
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fname": "Proshanto",
        "lname": "Saha",
        "email": "proshanto@gmail.com",
        "phone": "01717777777",
        "userType": "user",
        "status": "active",
        "createdAt": "2024-07-21T16:06:23.761Z",
        "updatedAt": "2024-07-21T16:06:23.761Z"
    }
}
```

**Delete User by ID**
URL: /users/:id

Method: DELETE

Response:
```bash
{
    "success": true,
    "message": "User deleted"
}
```

**Get Users with Pagination**
URL: /users

Method: GET

Query Parameters: page (default: 1), limit (default: 10)

Response:
```bash
{
    "success": true,
    "users": [
    {
        "_id": "60d0fe4f5311236168a109ca",
        "fname": "Proshanto",
        "lname": "Saha",
        "email": "proshanto@gmail.com",
        "phone": "01717777777",
        "userType": "user",
        "status": "active",
        "createdAt": "2024-07-21T16:06:23.761Z",
        "updatedAt": "2024-07-21T16:06:23.761Z"
    },
        ...
    ],
    "totalPages": 5,
    "currentPage": 1
}
```
