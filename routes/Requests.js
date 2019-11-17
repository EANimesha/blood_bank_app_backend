const express= require('express');
const requests=express.Router();

const cors=require("cors");

const Request=require("../models/Requests");
requests.use(cors())

//add a request
requests.post('/add',(req,res)=>{
    const today=new Date();
    const requestData={
        viewer_id:req.body.viewer_id,
        donar_id:req.body.donar_id,
        status:false,
        created:today
    }
    Request.findOne({
         viewer_id:req.body.viewer_id ,donar_id:req.body.donar_id 
    })
    .then(request=>{
        if(!request){
            Request.create(requestData)
            .then(request=>{
                   res.json({status:' Registered'})
             })
            .catch(err=>{
                res.send('error: '+err);
           })
        }else{
            res.json({error:'Request already exists'})
        }
    })
    .catch(err=>{
        res.send('error : '+err)
    })
})




module.exports=requests;