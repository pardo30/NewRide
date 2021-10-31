const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
try {
    const token = req.headers['authorization'];
    if (token) {
        const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
        if (verifyToken) {
            user = await User.findById(verifyToken);
            req.userID = user._id;
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