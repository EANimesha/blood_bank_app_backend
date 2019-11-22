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

//get requests sent for donars
requests.get('/sent/:id',(req,res)=>{
    const {id}=req.params;
    Request.find({viewer_id:id})
    .then(request=>res.json(request))
    .catch(err=>{
        res.send('error '+err)
    })
})

//get requested received for donars
requests.get('/received/:id',(req,res)=>{
    const {id}=req.params;
    Request.find({donar_id:id})
    .then(request=>res.json(request))
    .catch(err=>{
        res.send('error '+err)
    })
})

// requests.get('/profile',(req,res)=>{
//     const {id}=req.body;
//     Viewer.updateOne({_id:id},{$set:req.body},function(err,result){
//         if(err){
//             res.send({'error':'An error has occurred'});
//         }else{
//             console.log('' + result + ' document(s) updated');
//             res.send(user);
//         }

// })
// })  

module.exports=requests; 