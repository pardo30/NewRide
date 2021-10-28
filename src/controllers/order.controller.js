const orderMethod = {};
const Order = require('../models/order.model');
const Product = require('../models/product.model');

orderMethod.getAllItems = async (req, res) => {
    const userID = req.userID;
    try {
        const order = await Order.findOne({ userID})
        if (!order) {
            return res.status(400).json({
                status: false,
                message: 'Order not found.',
            });
        }
        res.status(200).json({
            status: true,
            items: order
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Order error, please try again."
        })
    }
};
orderMethod.addOrder = async (req, res) => {
    const { productID, quantity } = req.body
    const userID = req.userID;
    try {
        let order = await Order.findOne({ userID });
        let productDetails = await Product.findById(productID);
        if (order) {
            let itemIndex = order.items.findIndex(item => item.productID == productID)
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = order.items[itemIndex];
                productItem.quantity = quantity;
                order.items[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                order.items.push({
                    productID: productID,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                });
                order = await order.save();
                return res.status(200).json({
                    status: true,
                    message: "Order has been created ",
                    items: order
                }).send(order)
            }

        } else {
            //no cart for user, create new cart
            const newOrder = await new Order({
                userID,
                items: [{
                    productID: productID,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                }]
            });
            if (await newOrder.save()) {
                return res.status(201).json({
                    status: true,
                    message: 'Product created successfully.',
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Product has not been saved, please try again.',
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Order error, please try again."
        })
    }
};
orderMethod.emptyOrder = async (req, res) => {
    const userID = "617198ac9436ba05895fc287";
    try {
        let order = await Order.findOne({ userID });
        console.log(order);
        order.items = [];
        order.subTotal = 0
        console.log(order);
        console.log("hola");
        if (await order.save()) {
            return res.status(200).json({
                status: true,
                message: "Order Has been emptied",
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "Order empty error, please try again."
            })
        }
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Order empty error, please try again."
        })
    }
};

module.exports = orderMethod;
