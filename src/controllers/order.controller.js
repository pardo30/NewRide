const orderMethod = {};
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

orderMethod.checkout = async (req, res) => {
    try {
        const userID = req.userID;
        const populateUser = {
            path: 'userID',
            select: 'name address email'
        };
        const populateProduct = {
            path: 'items.productID',
            select: 'name category description price stock'
        };
        let cart = await Cart.findOne({ userID });
        if (cart) {
            const order = await new Order({
                userID,
                items: cart.items,
                total: cart.total
            });
            await Cart.findByIdAndDelete({ _id: cart.id });
            await order.save();
            await Order.findOne({ userID })
                .populate(populateUser)
                .populate(populateProduct)
                .exec((error, order) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            error
                        });
                    }
                    Cart.count({}, (err, total) => {
                        res.status(200).json({
                            success: true,
                            order,
                            total
                        });
                    })
                })
        } else {
            return res.status(400).json({
                status: false,
                message: 'Empty cart, please try again.'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Order error, please try again.'
        });
    }
};

orderMethod.getAllOrder = async (req, res) => {
    try {
        const order = await Order.find()
        if (!order) {
            return res.status(400).json({
                status: false,
                message: 'Orders not found.',
            });
        }
        res.status(200).json({
            status: true,
            order
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: 'Order error, please try again.'
        });
    }
};

orderMethod.getUserOrder = async (req, res) => {

    try {
        const userID = req.userID;
        const order = await Order.find({ userID })
        if (!order) {
            return res.status(400).json({
                status: false,
                message: 'Orders not found.',
            });
        }
        res.status(200).json({
            status: true,
            order
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: 'Order error, please try again.'
        });
    }
};

module.exports = orderMethod;
