const express= require('express');
const jwt=require('jsonwebtoken');
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
    .exec()
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const token=jwt.sign({user},"secret",{expiresIn:"1h"},(err, token) => {
                    if(err) { console.log(err) }    
                    res.json(token);
                });
                // // return res.json(user);
                // return res.status(200).json({
                //     message:"Auth successful",
                //     token:token
                // })
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
viewers.get('/user',verifyToken,(req,res)=>{
    jwt.verify(req.body.token,'secret',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            var user=authData["user"]
            res.status(200).json(
                // {
                // message:'verified user',
                authData
            // }
            );
        }
    })
    // const {id}=req.params;
    // Viewer.find({_id:id})
    // .then(user=>res.json(user))
    // .catch(err=>{
    //     res.send('error '+err)
    // })
})

async function verifyToken(req,res,next){
    const header = req.headers['authorization'];
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[0];
        req.body.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }

    // console.log(req.header.authorization);
    // if(typeof req.headers.authorization !=="undefined"){
    //     let token=req.headers.authorization.split(" ")[1];
    //     jwt.verify(token,'secret',(err,decoded)=>{
    //         if(err){
    //             res.json("not authorized")
    //         }
    //         console.log(decoded);
    //         return next();

    //     })
    // }else{
    //     res.json("not Authorized")
    // }


    // const bearerHeader=req.headers['authorization'];
    // if(typeof bearerHeader!=='undefined'){
    //     const bearer= bearerHeader.split(' ');
    //     const bearerToken=bearer[1];
    //     req.token=bearerToken;
    //     next();
    // }else{
    //     res.sendStatus(403)
    // }
}

module.exports=viewers;