const productMethod = {};
const Product = require('../models/product.model');

async function getProduct(_fields) {
    try {
        return Product.findOne(_fields).exec();
    } catch (error) {
        return false;
    }
};

// async function deleteProduct(_fields) {
//     try {
//         return await Product.deleteOne(_fields).exec();
//     } catch (error) {
//         return false;
//     }
// };

productMethod.getProducts = async (req, res) => {
    const products = await Product.find();
    try {
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: "Products found."
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "No products found."
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "There was a problem, please try again."
        })
    }
};
productMethod.getProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if (productID) {
            const product = await getProduct({ _id: productID })
            if (product) {
                return res.status(200).json({
                    status: true,
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
    console.log(name);
    //await getProduct(refCode)
    if (refCode, name, category, image, price, stock) {
        const verifyProduct = await getProduct({ refCode: refCode });
        console.log(verifyProduct)
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
                message: "Product already exists."
            })
        }
    }
};
productMethod.updateProduct = async (req, res) => {
    // const productID = req.params.id;
    // let product = await getProduct({ id: productID });
    // const { refCode, name, category, description, image, price, stock } = req.body;
    try {
        let body = req.body;
        Product.findOneAndUpdate({ _id: body._id }, {
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
    const { refCode } = req.body;
    const verifyProduct = await getProduct({ refCode: refCode });
    if (verifyProduct) {
        await Product.deleteOne({ refCode: refCode })
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
    } else {
        return res.status(400).json({
            status: false,
            message: 'This product does not exist, please try again.',
        });
    }

};

module.exports = productMethod;