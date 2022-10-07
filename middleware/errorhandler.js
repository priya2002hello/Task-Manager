const {createCustomError,CustomApiError}=require('../errors/custom-error');


const errorhandler=(err,req,res,next)=>{
   if(err instanceof CustomApiError)
    return res.status(err.statuscode).json({msg:err.message})
return res.status(500).json({msg:"Something went wrong try again"});
}

module.exports=errorhandler;