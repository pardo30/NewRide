const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const accessAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token) {
            const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
            if (verifyToken) {
                const user = await User.findById(verifyToken);
                if (user.isAdmin == true) {
                    next();
                } else {
                    return res.status(401).json({
                        status: false,
                        message: 'You are not allowed.'
                    });
                }
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

module.exports = accessAdmin;