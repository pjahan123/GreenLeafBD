const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},
 price:{type:Number,required:true,min:0},
 category:{type:String,required:true,trim:true},
 description:{type:String,default:''},
 image:{type:String,default:''},
 light:{type:String,default:''},
 water:{type:String,default:''},
 difficulty:{type:String,default:''},
 height:{type:String,default:''},
 bestFor:{type:String,default:''},
 temperature:{type:String,default:''},
 petSafety:{type:String,default:''}
},{timestamps:true});
module.exports=mongoose.model('Plant',schema);
