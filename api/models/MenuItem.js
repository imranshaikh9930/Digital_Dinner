const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        index:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    options:[
        {
            size:String,
            price:Number
        }
    ]

},{timestamps:true});

module.exports = mongoose.model("MENUITEM",menuItemSchema);