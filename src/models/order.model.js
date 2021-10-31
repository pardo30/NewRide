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
            productName: {
                type: String
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
            subtotal: {
                type: Number
            }
        }],
    total: {
        type: Number,
        default: 0
    },
    date : { 
        type : Date, 
        default: Date.now 
    }
});

module.exports = model("Order", orderSchema);