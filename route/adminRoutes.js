const express = require('express');
const { registerAdmin, loginAdmin, getAssignment, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { userMiddleware } = require('../middlewares/userMiddleware');

const adminRoute = express.Router();

adminRoute.post('/register', registerAdmin);
adminRoute.post('/login', loginAdmin);
adminRoute.get('/assignments', adminMiddleware, getAssignment);
adminRoute.post('/:id/accept', acceptAssignment);
adminRoute.post('/:id/reject', rejectAssignment);

module.exports = {
    adminRoute
}