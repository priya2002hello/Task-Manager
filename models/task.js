const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
       required:[true,'must provide name'],
       maxlength:[100,'name cannot be more than 20 charachters'],
       trim:true
    },
       completed:{
           type:Boolean,
           default:false
       }
})

const Taskmodel=mongoose.model('Task',TaskSchema);

module.exports=Taskmodel;