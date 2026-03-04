/*POST /api/users
The controller will:
Get user data from request
Validate it
Save to DB
Return success message*/
import {asyncHandler} from "../utils/asyncHandler.js"
const registerUser=asyncHandler(async(req,res)=>{
    res.status(200).json({
          message:"ok"
    })
})

// so here whenever the asyncHandler is called it return async(req,res,next)=>
//     so the fucntion is run in a try catch and to perfrom async actiutes
/*const asyncHanler=(fn)=>async(req,res,next)=>{
try {
    await fn(req,res,next)
} catch (error) {
    res.status(error.code||500).json({
        success:false,
        message:error.message
    })
}
    -------------------------------------
    fn = async (req, res) => {
        res.status(200).json({ message: "ok" })
     }
    */
export {registerUser}