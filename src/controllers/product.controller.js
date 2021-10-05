const productMethod = {};
const Product = require('../models/product.model');

async function getProduct(_fields){
    try {
        return Product.findOne(_fields);
    } catch (error) {
        return false;
    }
};

productMethod.getProducts = async (req,res) =>{ };
productMethod.getProduct = async (req,res) =>{ };
productMethod.createProduct = async (req,res) =>{
    const { refCode, name, category, description, image, price, stock } = req.body;
    console.log(name);
    if(refCode, name, category, image, price, stock){
        const verifyProduct = await getProduct({ refCode : refCode });
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
productMethod.updateProducts = async (req,res) =>{ };
productMethod.deleteProducts = async (req,res) =>{ };

module.exports = productMethod;