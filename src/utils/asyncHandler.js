
const asyncHandler=(RequestHandler)=>{
   return (req,res,next)=>{
  Promise.resolve(RequestHandler(req,res,next)).catch((err)=>next(err))
   }
}

export {asyncHandler}
/*asynchandler using try catch block
"It’s for wrapping async functions in try–catch by calling
 through a higher-order function asyncHandler, so it 
 returns the function async (req, res, next) that runs 
 the code in a try–catch block.”
const asyncHanler=(fn)=>async(req,res,next)=>{
try {
    await fn(req,res,next)
} catch (error) {
    res.status(error.code||500).json({
        success:false,
        message:error.message
    })
}
}
*/