
const { findOneAndDelete, findOneAndUpdate } = require('../models/task');
const asyncWrapper=require('../middleware/async')
const Task=require('../models/task');
const {createCustomError,CustomApiError}=require('../errors/custom-error');

//get all tasks.
const get_tasks=asyncWrapper(async(req,res,next)=>{
    const alltasks=await Task.find({});
    res.status(201).json(alltasks);
    //res.status(500).json({msg:error});
});

//create new task
const post_tasks=asyncWrapper(async(req,res,next)=>{
        const task=await Task.create(req.body);
        res.status(201).json(task);
})

//get single task
const getsingle_task=asyncWrapper(async(req,res,next)=>{
     
        const singletask=await Task.findOne({_id:req.params.id});
        if(!singletask){
            return next(createCustomError("task not found",404))
            //return res.status(404).send("task not found");
        }
        else
            res.status(201).json(singletask);
})

const deletetask=asyncWrapper(async(req,res,next)=>{
 
        const deletedtask=await Task.findOneAndDelete({_id:req.params.id});
        if(!deletedtask)
            return next(createCustomError("task not found",404))   
            //return res.status(404).json({msg:"task not found"});
        else
           res.status(201).json({status:"deleted"});

})

const updatetask=asyncWrapper(async(req,res,next)=>{
   
        const {id:taskID}=req.params;
        
        const newtask=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })

        if(!newtask)
          return next(createCustomError("task not found",404))
          //return res.status(404).json({msg:"task not found"});
        else
           res.status(201).json(newtask);
    
})

module.exports={get_tasks,
               post_tasks,
               getsingle_task,
               deletetask,
               updatetask};