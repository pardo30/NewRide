const productMethod = {};
const Product = require('../models/product.model');

async function getProduct(_fields) {
    try {
        return Product.findOne(_fields).exec();
    } catch (error) {
        return false;
    }
};


productMethod.getProducts = async (req, res) => {
    const products = await Product.find();
    try {
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: 'Products found.'
            })
        } else {
            return res.status(400).json({
                status: false,
                message: 'No products found.'
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.'
        })
    }
};
productMethod.getProduct = async (req, res) => {
    try {
        const productID = req.query.id;
        if (productID) {
            const product = await getProduct({ _id: productID })
            if (product) {
                return res.status(200).json({
                    status: true,
                    product,
                    message: 'Product found.',
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Product not found.',
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Product not found.',
        });
    }
};
productMethod.createProduct = async (req, res) => {
    const { refCode, name, category, description, image, price, stock } = req.body;
    //await getProduct(refCode)
    if (refCode, name, category, image, price, stock) {
        const verifyProduct = await getProduct({ refCode: refCode });
        if (!verifyProduct) {
            const product = new Product({
                refCode,
                name,
                category,
                description,
                image,
                price,
                stock
            })
            if (await product.save()) {
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
        } else {
            return res.status(400).json({
                status: false,
                message: 'Product already exists.'
            })
        }
    }
};
productMethod.updateProduct = async (req, res) => {
    try {
        const productID = req.query.id;
        Product.findOneAndUpdate({ _id: productID }, {
            $set: req.body
        },
            function (error) {
                if (error) {
                    return res.status(400).json({
                        status: false,
                        message: 'Product not updated.',
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'Product successfully updated.',
                    });
                }
            }
        )
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Product not found.',
        });
    }
};
productMethod.deleteProduct = async (req, res) => {
    const productID = req.query.id;
    try {
        await Product.deleteOne({ _id: productID })
            .then(function () {
                return res.status(200).json({
                    status: true,
                    message: 'The product was eliminated succesfully.',
                });
            })
            .catch(function () {
                return res.status(400).json({
                    status: false,
                    message: 'There was a problem, please try again.',
                });
            })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
productMethod.filterByCategory = async (req, res) => {
    const category = req.query.category;
    try {
        const products = await Product.find({ category: category })
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: 'Products found by category',
            });
        } else {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
productMethod.filterByText = async (req, res) => {
    const text = req.query.q;
    if(text){
        const products = await Product.find(
            {$text:{$search: text}},
            {score:{$meta: 'textScore'}}
        ).sort({
            score:{$meta:'textScore'}
        })
        return res.status(200).json({
            status: true,
            products,
            message: 'Products found by category',
        });
    }else{
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
productMethod.filterByPriceAsc = async (req, res) => {
    try {
        const products = await Product.find().sort({price:1})
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: 'Products order by price',
            });
        } else {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
productMethod.filterByPriceDesc = async (req, res) => {
    try {
        const products = await Product.find().sort({price:-1})
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: 'Products order by price',
            });
        } else {
            return res.status(400).json({
                status: false,
                message: 'There was a problem, please try again.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'There was a problem, please try again.',
        });
    }
};
module.exports = productMethod;