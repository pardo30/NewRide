const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    refCode: {        
        type: String,
        require: true,
        unique: true
    },
    name: {        
        type: String,
        require: true
    },
    category: {        
        type: String,
        require: true
    },
    description: {        
        type: String
    },
    image: {        
        type: String,
        require: true
    },
    price: {        
        type: Number,
        require: true
    },
    stock: {        
        type: Number,
        require: true
    }

})

module.exports = model("Product", productSchema);