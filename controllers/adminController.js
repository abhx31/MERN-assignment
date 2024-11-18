const { adminModel } = require("../models/adminModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { assignmentModel } = require("../models/assignmentModel");
const { UserModel } = require("../models/userModel");

const registerAdmin  = async function(req, res) {
    try {
        const {name, email, password } = req.body;
        let admin = await adminModel.findOne({
            email: email
        })
        if(admin) {
            return res.status(200).json({
                message: "Admin already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        admin = await adminModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            name
        }, process.env.SECRET);

        return res.status(201).json({
            message: "Admin created successfully",
            token
        })
        
    } catch (err) {
        console.log(err);
    }
}

const loginAdmin = async function(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({
            email
        })

        if(!admin) {
            return res.status(403).json({
                message: "Invalid credentials",
            })
        }

        const match = await bcrypt.compare(password, admin.password);
        
        if(!match) {
            return res.status(403).json({
                message: "Invalid Credentials",
            })
        }

        return res.status(200).json({
            message: "Signed In successfully",
        })
    } catch(err) {
        console.log(err);
    }
}

const getAssignment = async function(req, res) {
    const name = req.name; 
    const assignments = await assignmentModel.find({
        admin: name
    })
    return res.status(200).json({
        message: "Assignments retrieved successfully",
        assignments
    })
}

const acceptAssignment = async function(req, res) {
    const { id } = req.params;
    const updatedAssignment = await assignmentModel.findByIdAndUpdate(
        id,
        {
            status: "Accepted",
        },
        {
            new: true
        }
    )
    console.log(updatedAssignment);
    if (!updatedAssignment) {
        return res.status(404).json({
            message: "Assignment not found",
        });
    }

    return res.status(201).json({
        message: "Assignment Updated",
        assignment: updatedAssignment
    })

}

const rejectAssignment = async function(req, res) {
    const { id } = req.params;
    const updatedAssignment = await assignmentModel.findByIdAndUpdate(
        id,
        {
            status: "Rejected",
        },
        {
            new: true
        }
    )

    return res.status(201).json({
        message: "Assignment Updated",
        assignment: updatedAssignment
    })

}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAssignment,
    acceptAssignment,
    rejectAssignment
}