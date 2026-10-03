const mongoose=require('mongoose');
module.exports=mongoose.model('Order',new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},items:[{name:String,price:Number,quantity:Number}],total:Number,delivery:{name:String,phone:String,address:String},status:{type:String,default:'Placed'}},{timestamps:true}));
