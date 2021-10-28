const { Schema, model } = require('mongoose');
//const User = mongoose.model('User');
//const Product = mongoose.model('Product');

const orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
            price:{
                type: Number,
                required: true
            },
            total: {
                type: Number
            }
        }],
    subtotal: {
        type: Number,
        default: 0
    }
});

module.exports = model("Order", orderSchema);