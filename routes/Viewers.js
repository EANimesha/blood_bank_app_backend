const express= require('express');
const viewers=express.Router();

const cors=require("cors");
// const bcrypt=require("bcrypt");
const bcrypt=require('bcrypt-nodejs')

const Viewer=require("../models/Viewer");
viewers.use(cors())

//get viewer data
viewers.get('/',(req,res)=>{
    Viewer.find(function(err,viewers){
        res.json(viewers);
    })
})

//add a viewer
viewers.post('/register',(req,res)=>{
    const today=new Date();
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        donar:req.body.donar,
        blood_type:req.body.blood_type,
        weight:req.body.weight,
        height:req.body.height,
        created:today
    }
    Viewer.findOne({
        email:req.body.email 
    })
    .then(user=>{
        if(!user){
            const hash =bcrypt.hashSync(userData.password);
            // bcrypt.hash(req.body.password,10,(err,hash)=>{
            userData.password=hash;
            Viewer.create(userData)
            .then(user=>{
                   res.json({status:user.email+' Registered'})
             })
            .catch(err=>{
                res.send('error: '+err);
           })
            // })
        }else{
            res.json({error:'User already exists'})
        }
    })
    .catch(err=>{
        res.send('error : '+err)
    })
})


// viewer login
viewers.post('/login',(req,res)=>{
    Viewer.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                return res.json(user);
            }else{
                res.status(400).json('wrong credentials')
            }
        }else{
            res.json({error:'User does not exist'})
        }
    })
    .catch(err=>{
        res.send('error '+err)
    })
})

// viewers.post('/login',(req,res)=>{
//     // res.json('signin');
//     db.select('email','hash').from('login')
//     .where('email','=',req.body.email)
//     .then(data=>{
//         const isValid=bcrypt.compareSync(req.body.password,data[0].hash)
//         if(isValid){
//             return db.select('*').from('users')
//             .where('email','=',req.body.email)
//             .then(user=>{
//                 res.json(user[0])
//             })
//             .catch(err=>res.status(400).json('unable to get user'))
//         }
//         else{
//             res.status(400).json('wrong credentials')
//         }
//     })
//     .catch(err=>res.status(400).json('wrong credentials'))
// });


//get blood donar details
viewers.get('/donars',(req,res)=>{
    Viewer.find({donar:true})
    .then(donars=>res.json(donars))
    .catch(err=>{
        res.send('error '+err)
    })
})

//get a certain user by id
viewers.get('/:id',(req,res)=>{
    const {id}=req.params;
    Viewer.find({_id:id})
    .then(user=>res.json(user))
    .catch(err=>{
        res.send('error '+err)
    })
})
  
module.exports=viewers;