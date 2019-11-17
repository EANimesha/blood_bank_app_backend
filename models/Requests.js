const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RequestSchema =new Schema({
    viewer_id:{
        type:String,
        require:true
    },
    donar_id:{
        type:String,
        require:true
    },
    state:{
        type:Boolean
    },
    created:{
        type:Date,
        default:Date.now
    }
});


module.exports=Request=mongoose.model('requests',RequestSchema);