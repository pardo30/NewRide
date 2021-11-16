const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productID: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            subtotal: {
                type: Number
            }
        }],
    total: {
        type: Number,
        default: 0
    }
});

module.exports = model('Cart', cartSchema);