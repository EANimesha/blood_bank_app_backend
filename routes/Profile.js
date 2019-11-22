const express= require('express');
const profile=express.Router();

const cors=require("cors");
const bcrypt=require('bcrypt-nodejs')

const Viewer=require("../models/Viewer");
profile.use(cors())


profile.put('/:id',(req,res)=>{
    const {id}=req.params;
    req.body.password =bcrypt.hashSync(req.body.password);
    // var newvalues = { $set: { "first_name":req.body.first_name,"last_name": req.body.last_name,"email":req.body.email,"password":req.body.password,
    // "donar": req.body.donar,"blood_type": req.body.blood_type,"weight":req.body.weight,"height": req.body.weight } };
    Viewer.updateOne({_id:id},{$set:req.body},function(err,result){
        if(err){
            res.send({'error':'An error has occurred'});
        }else{
            console.log('' + result + ' document(s) updated');
            res.send(result);
        }

})

}) 

module.exports=profile;