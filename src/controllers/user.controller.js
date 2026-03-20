/*POST /api/users
The controller will:
Get user data from request
Validate it
Save to DB
Return success message*/
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation -not empty
    //check if user already exist:username,pass
    //upload them to cloudinary,avatar
    //create user object-create entry in db 
    //remove pass and refresh token field from response 
    //check for user reation
    //return res
     const{fullName,email,password}=req.body
     console.log("email:",email)

// if(fullName===""){
//     throw new ApiError(400,"fullName is reuired")
// }
if(
   [fullName,email,username,password].some((field)=>
     field?.trim()==="")
   /*field?.trim()
?. = optional chaining-without this we get error
Prevents error if field is null or undefined 
["Bhanu", "test@gmail.com", "   ", "123"]
Since one is empty, .some() returns true
*/
){
    throw new ApiError(400,"all fields are required")
}

  const existedUser=User.findOne({
    $or:[{ username },{ email }]
   })
   if(existedUser){
    throw new ApiError(409,"user name or email already exist")
   }
    console.log(existedUser)
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;
   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar is  required ")
   }
       const avatar=await uploadOnCloudinary(avatarLocalPath)
       const coverImage=await uploadOnCloudinary(coverImageLocalPath)
     if(!avatar){
      throw new ApiError(400,"Avatar is  required ")
   }
 const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url|| "",// if coverImage exist then gets its url or keep empty
    email,
    password,
    username:username.toLowerCase
   })
   const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
   )

   if(!createdUser){
     throw new ApiError(500,"something went wrong while registering the user")
   }
        return res.status(201).json(
            new ApiResponse(200,createdUser,"user registered Successfully")
        )
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
   })
export {registerUser}