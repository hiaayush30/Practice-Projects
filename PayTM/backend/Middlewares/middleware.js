const { JWT_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");


async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userId = jwt.verify(token, JWT_PASSWORD).userId;
        req.userId = userId
        next();
    } catch (e) {
        res.status(403).json({
            msg: "invalid token/ token not found!"
        })
    }
}

module.exports = authMiddleware;