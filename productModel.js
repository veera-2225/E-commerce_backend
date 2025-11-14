const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
    type:{
        type:String
    },
    company:{
        type:String
    },
    model:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type:String
    },
    rating:{
        type:String
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product