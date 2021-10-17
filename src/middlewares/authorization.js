const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
try {
    const token = req.headers['authorization'];
    console.log(token)
    if (token) {
        const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
        if (verifyToken) {
            req.user = await User.findById(verifyToken);
            next();
        }
    } else {
        return res.status(400).json({
            status: false,
            message: 'The token is required.'
        });
    }
} catch (error) {
    return res.status(400).json({
        status: false,
        message: 'The token is invalid.'
    });
}
};

module.exports = authMiddleware;