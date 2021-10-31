const orderMethod = {};
const Order = require('../models/order.model');
const Product = require('../models/product.model');

orderMethod.getOrderByUser = async (req, res) => {
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
            order: order
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
                //product exists in the order, update the quantity
                let productItem = order.items[itemIndex];
                productItem.quantity = quantity;
                order.items[itemIndex] = productItem;
            } else {
                //product does not exists in order, add new item
                order.items.push({
                    productID: productID,
                    productName: productDetails.name,
                    quantity: quantity,
                    price: productDetails.price,
                    subtotal: parseInt(productDetails.price * quantity)
                });
                order.total = order.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                order = await order.save();
                return res.status(200).json({
                    status: true,
                    message: "Order has been created ",
                }).send(order)
            }

        } else {
            //no cart for user, create new cart
            const newOrder = await new Order({
                userID,
                items: [{
                    productID: productID,
                    productName: productDetails.name,
                    quantity: quantity,
                    price: productDetails.price,
                    subtotal: parseInt(productDetails.price * quantity)
                }],
                total: parseInt(productDetails.price * quantity)
            });
            if (await newOrder.save()) {
                return res.status(201).json({
                    status: true,
                    message: 'Order created successfully.',
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Order has not been saved, please try again.',
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
// orderMethod.addOrder = async (req, res) => {
//     const { productID, quantity } = req.body

//     try {
//     } catch (error) {
//         return res.status(400).json({
//             status: false,
//             message: "Order error, please try again."
//         })
//     }
// };
orderMethod.emptyOrder = async (req, res) => {
    const userID = req.userID;
    try {
        let order = await Order.findOne({ userID });
        order.items = [];
        order.total = 0
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
orderMethod.getAllOrder = async (req, res) => {
    const userID = req.query.userID;
    try {
        const order = await Order.find()
        if (!order) {
            return res.status(400).json({
                status: false,
                message: 'Order not found.',
            });
        }
        res.status(200).json({
            status: true,
            order
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Order error, please try again."
        })
    }
};

module.exports = orderMethod;
