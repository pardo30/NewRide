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
                    message: 'Email already exists, please try another one.',
                })
            } else {
                const verifyUsername = await getUser({ username });
                if (verifyUsername) {
                    return res.status(400).json({
                        status: false,
                        message: 'Username already exists, please try another one.',
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
                        message: 'User successfully created.',
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'User has not been saved, please try again.',
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
            message: 'Please, fill in all the requested fields.',
        })
    }
};
userMethods.registerAdmin = async (req, res) => {
    const { username, email, password, name, isAdmin } = req.body;
    if (username, email, password) {
        try {
            const verifyEmail = await getUser({ email });
            if (verifyEmail) {
                return res.status(400).json({
                    status: false,
                    message: 'Email already exists, please try another one.',
                })
            } else {
                const verifyUsername = await getUser({ username });
                if (verifyUsername) {
                    return res.status(400).json({
                        status: false,
                        message: 'Username already exists, please try another one.',
                    })
                }
                const user = new User({
                    username,
                    email,
                    password,
                    name,
                    isAdmin: true
                });

                user.password = await user.encryptPassword(user.password);
                if (await user.save()) {
                    return res.status(201).json({
                        status: true,
                        message: 'Admin successfully created.',
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'Admin has not been saved, please try again.',
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
            message: 'Please, fill in all the requested fields.',
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
                email,
                token,
                message: 'Login correct.'
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            })
        }
    }else{
        return res.status(400).json({
            status: false,
            message: 'Email does not exist, please try again.',
        })
    }
};
// userMethods.authenticate = async (req, res) => {
//     try {
//         const token = req.headers['authorization'];
//         console.log(token)
//         if (token) {
//             const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
//             console.log(verifyToken);
//             if (verifyToken) {
//                 let user = await User.findById(verifyToken);
//                 return res.status(200).json({
//                     status: true,
//                     user,
//                     message: 'The token is correct.',
//                 });
//             }
//         } else {
//             return res.status(400).json({
//                 status: false,
//                 message: 'The token is required.'
//             });
//         }
//     } catch (error) {
//         return res.status(400).json({
//             status: false,
//             message: 'The token is invalid.'
//         });
//     }
// };

userMethods.userProfil = async (req, res) => {
    const userID = req.userID;
    try {
        const user = await User.findOne({ _id: userID })
        if (user) {
            return res.status(200).json({
                status: true,
                user
            })
        } else {
            return res.status(404).json({
                status: false,
                message: 'User not found.'
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.'
        })
    }
};
userMethods.updatetUserProfil = async (req, res) => {
    const userID = req.userID;
    try {
        User.findOneAndUpdate({ _id: userID }, {
            $set: req.body
        },
            function (error) {
                if (error) {
                    return res.status(400).json({
                        status: false,
                        message: 'User not updated.',
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'User successfully updated.',
                    });
                }
            }
        )
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
userMethods.deleteUserProfil = async (req, res) => {
    const userID = req.userID;
    try {
        await User.deleteOne({ _id: userID })
            .then(function () {
                return res.status(200).json({
                    status: true,
                    message: 'User successfully deleted.',
                });
            })
            .catch(function () {
                return res.status(400).json({
                    status: false,
                    message: 'User not updated.',
                });
            })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
userMethods.getAllUser = async (req, res) => {
    const users = await User.find();
    try {
        if (users) {
            return res.status(200).json({
                status: true,
                users
            })
        } else {
            return res.status(404).json({
                status: false,
                message: 'Users not found.'
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.'
        })
    }
}

module.exports = userMethods;