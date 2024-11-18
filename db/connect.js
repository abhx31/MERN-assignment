const mongoose = require('mongoose');

const connectDB = async function(req, res) {
    await mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log("Db connected");
    })
    .catch(function(e) {
        console.log(`Error in connecting to DB ${e}`);
    })
}

module.exports = {
    connectDB: connectDB
}