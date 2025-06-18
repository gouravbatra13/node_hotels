const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
     name : {
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     taste:{
        type:String,
        enum:['sweet','spicy','sour']
     },
     is_drink:{
        type:Boolean,
        default:false
     },
     ingredients:{
        type:[String],
        default:[]
     },
     num_sales:{
        type:Number,
        default:0
     }
}); 



const menuItems = mongoose.model('MenuItems',menuSchema);
module.exports = menuItems;



//est
