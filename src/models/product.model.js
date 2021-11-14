const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    refCode: {        
        type: String,
        require: true,
        unique: true,
        //index: true
    },
    name: {        
        type: String,
        require: true,
        //index: true
    },
    category: {        
        type: String,
        require: true,
        //index: true
    },
    description: {        
        type: String,
        //index: true
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
    },
    date : { 
        type : Date, 
        default: Date.now 
    }
});
productSchema.index({name: 'text', refCode: 'text', category: 'text', description:'text'},{ name: 'textScore'});
module.exports = model("Product", productSchema);