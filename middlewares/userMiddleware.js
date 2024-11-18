const jwt = require('jsonwebtoken');
const userMiddleware = function(req, res, next) {
    try {
        const { token } = req.body;
        if(!token) {
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        const decodedId = jwt.verify(token, process.env.SECRET);
        req.userId = decodedId._id;
        next();
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    userMiddleware
}