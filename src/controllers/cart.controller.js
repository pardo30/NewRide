const cartMethod = {};
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');


cartMethod.getCartByUser = async (req, res) => {
    const userID = req.userID;
    const populateUser = {
        path: 'userID',
        select: 'name address email'
    }
    const populateProduct = {
        path: 'items.productID',
        select: 'name category description price stock'
    }
    try {
        const cart = await Cart.findOne({ userID })

        if (!cart) {
            return res.status(400).json({
                status: false,
                message: 'Cart not found.',
            });
        }
        await Cart.findOne({ userID })
            .populate(populateUser)
            .populate(populateProduct)
            .exec((error, cart) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        error
                    })
                }
                Cart.count({}, (err, total) => {
                    res.status(200).json({
                        success: true,
                        cart,
                        total
                    })
                })
            })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: 'Cart error, please try again.'
        })
    }
};

cartMethod.addProduct = async (req, res) => {
    const userID = req.userID;
    const { productID, quantity } = req.body
    try {
        let cart = await Cart.findOne({ userID });
        let product = await Product.findById(productID);
        if (!product) {
            return res.status(400).json({
                status: false,
                message: 'Product not found.'
            })
        }
        if (cart) {
            let itemIndex = cart.items.findIndex(item => item.productID == productID)
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                cart.items[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.items.push({
                    productID: productID,
                    quantity: quantity,
                    subtotal: parseInt(product.price * quantity)
                });
                cart.total = cart.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                cart = await cart.save();
                return res.status(200).json({
                    status: true,
                    message: 'Cart has been created ',
                }).send(cart)
            }

        } else {
            //no cart for user, create new cart
            const newCart = await new Cart({
                userID,
                items: [{
                    productID: productID,
                    quantity: quantity,
                    subtotal: parseInt(product.price * quantity)
                }],
                total: parseInt(product.price * quantity)
            });
            if (await newCart.save()) {
                return res.status(201).json({
                    status: true,
                    message: 'Cart created successfully.',
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Cart has not been saved, please try again.',
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Cart error, please try again.'
        })
    }
};

cartMethod.deleteProduct = async (req, res) => {
    const userID = req.userID;
    const productID = req.productID
    try {
        let cart = await Cart.findOne({ userID });
        let itemIndex = cart.items.findIndex(item => item.productID == productID)
        if (itemIndex > -1) {
            //let productItem = cart.items[itemIndex];
            //cart.total -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        if (await cart.save()) {    
            return res.status(200).json({
                status: true,
                message: 'Product has been deleted.',
            })
        } else {
            return res.status(400).json({
                status: false,
                message: 'Product delete error, please try again.'
            })
        }
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: 'Product delete error, please try again.'
        })
    }
};

module.exports = cartMethod;
