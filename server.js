var express= require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');
var path=require('path');
var viewers=require('./routes/Viewers')

var app=express();

const port=3000; 

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/blooddonar')
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db');
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error: ',err);
    }
})

app.use(cors());
app.use(bodyParser.json());
app.use('/viewers',viewers);

app.get('/',(req,res)=>{
    res.send('foobar')
})


app.listen(port,()=>console.log('Server started port '+ port))