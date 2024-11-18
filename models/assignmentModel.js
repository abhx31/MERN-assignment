const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    task: {
        type: String,
        require: true
    },
    admin: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Accepted"],
        default: "Pending"
    }
});

const assignmentModel = mongoose.model("Assignment", assignmentSchema);

module.exports = {
    assignmentModel: assignmentModel
}
