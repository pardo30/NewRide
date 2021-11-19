const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hashSync(password, salt)
};

module.exports = model('User', userSchema);