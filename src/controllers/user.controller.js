const userMethods = {};
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


async function getUser(param) {
    try {
        return User.findOne(param);
    } catch (error) {
        return false;
    }
}

userMethods.register = async (req, res) => {
    const { username, email, password, name, address } = req.body;
    if (username, email, password) {
        try {
            const verifyEmail = await getUser({ email });
            if (verifyEmail) {
                return res.status(400).json({
                    status: false,
                    message: 'Email already exists, please try with another one.',
                })
            } else {
                const verifyUsername = await getUser({ username });
                if (verifyUsername) {
                    return res.status(400).json({
                        status: false,
                        message: 'Username already exists, please try with another one.',
                    })
                }
                const user = new User({
                    username,
                    email,
                    password,
                    name,
                    address
                });

                user.password = await user.encryptPassword(user.password);
                if (await user.save()) {
                    return res.status(201).json({
                        status: true,
                        message: 'User created successfully.',
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'User has not been saved , please try again.',
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: 'Please fill in all requested fields.',
        })
    }
};
userMethods.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser({ email });
    if (user) {
        const verifyPassword = await user.verifyPassword(password);
        console.log(verifyPassword);
        if (!verifyPassword) {
            return res.status(400).json({
                status: false,
                message: 'Email or password incorrect.'
            })
        }
        try {
            const token = jwt.sign(user._id.toString(), process.env.PRIVATE_KEY);
            return res.status(200).json({
                status: true,
                token,
                message: 'Login correct.'
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            })
        }
    }
};
userMethods.authenticate = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        console.log(token)
        if (token) {
            const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
            if (verifyToken) {
                return res.status(200).json({
                    status: true,
                    message: 'The token is correct.',
                });
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
userMethods.userProfil = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await getUser({ email });
        console.log(user);
        if (user) {
            return res.status(200).json({
                status: true,
                user,
                message: "User found."
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "No user found."
            })
        }

    } catch (error) {

    }
};
userMethods.getAllUser = async (req, res) => {
    const users = await User.find();
    try {
        if (users) {
            return res.status(200).json({
                status: true,
                users,
                message: "Users found."
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "No users found."
            })
        } 
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No users found."
        })
    }
 }

module.exports = userMethods;