
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
 ----------------------------------------------
When a function is marked async:
It automatically returns a Promise.
If you throw an error inside it → that Promise becomes rejected.
-------------------------------------------------------
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
/*async functions are used to handle asynchronous operations.
Error handling using next() is just how we manage rejected promises in Express.
-----------------------------------------------
If an async function throws error and no one catches it:

Promise rejects

Express doesn’t know what to do

Process may crash

That’s why we use:

try/catch
OR

asyncHandler wrapper
 */