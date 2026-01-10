
const asyncHandler=(RequestHandler)=>{
   return (req,res,next)=>{
  Promise.resolve(RequestHandler(req,res,next)).catch((err)=>next(err))
   }
}

export {asyncHandler}
/*asynchandler using try catch block
const asyncHanler=(fn)=>async(req,res,next)=>{
try {
    await fn(req,res,next)
} catch (error) {
    res.status(error.code||500).json({
        success:false,
        message:err.message
    })
}
}
*/