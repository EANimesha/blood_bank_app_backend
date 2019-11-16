const mongoose=require('mongoose');
const Schema=mongoose.Schema
var bcrypt = require('bcrypt');

const UserSchema=new Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        required:true
    },
    donar:{
        type:Boolean,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    blood_type:{
        type:String,
    },
    age:{
        type:String
    },
    weight:{
        type:String
    },
    height:{
        type:String,
    }
});


module.exports=Viewer=mongoose.model('viewers',UserSchema);