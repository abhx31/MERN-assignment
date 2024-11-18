const { adminModel } = require("../models/adminModel");
const { assignmentModel } = require("../models/assignmentModel");
const { UserModel } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        let user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(403).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = await UserModel.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        const token = jwt.sign({ userId: user._id },process.env.SECRET);

        return res.status(201).json({
            message: "User created successfully!",
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(403).json({
                message: "Enter Credentials Correctly"
            })
        }
    
        const user = await UserModel.findOne({
            email: email
        })
    
        if(!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
    
        const match = await bcrypt.compare(password, user.password)
    
        if(!match) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
    } catch(err) {
        console.log(err);
    }

    return res.status(200).json({
        message: "Signin successful"
    })

}

const uploadAssignment = async function(req, res) {
    try {
        const { userId, task, admin } = req.body;

        let name = await UserModel.findOne({
            name: userId
        })

        if(!name) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const admins = adminModel.findOne({
            admin: admin,
        })

        if(!admins) {
            return res.status(403).json({
                message: "Admin does not exist",
            })
        }
        
        const assignment = await assignmentModel.create({
            userId: userId,
            task: task,
            admin: admin
        })

        const assignmentId = assignment._id;
    
        return res.status(201).json({
            message: "Assignment created successfully",
            assignmentId,
            assignment
        })
    } catch(err) {
        console.log(err);
    }
}

const getAllAdmins = async function(req, res) {
    try {
        const admins = await adminModel.find({});
        return res.status(200).json({
            message: "Admins retrieved successfully",
            admins
        })
    } catch(err) {
        console.log(err);
    }
}
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    uploadAssignment: uploadAssignment,
    getAllAdmins: getAllAdmins,
}
