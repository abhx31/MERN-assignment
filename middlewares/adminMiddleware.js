const jwt = require('jsonwebtoken');

const adminMiddleware = function(req, res, next) {
    try {
        const { token } = req.body;
        if(!token) {
            return res.status(401).json({
                message: "Authorization Denied"
            })
        }
        const decodedName = jwt.verify(token, process.env.SECRET);
        req.name = decodedName.name;
        next();
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    adminMiddleware,
}