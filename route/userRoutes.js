const express = require('express');
const { registerUser, loginUser, getAllAdmins, uploadAssignment } = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/upload', uploadAssignment);
userRoute.get('/admins', getAllAdmins);

module.exports = {
    userRoute
}