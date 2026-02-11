import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bycrypt from "bycrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
     avatar:{
        type:String,//cloudinary url its an image url
        required:true,
    },
     coverImage:{
        type:String,
    },
    watchHistory:[
       { type:Schema.type.ObjectId,
        ref:"Video"
    }
],
/*watchHistory is an array
Each element in the array is an ObjectId
That ObjectId points (references) a document in the Video collection
Yes, the ObjectId stored here is the _id of a Video document.
---------------------------------------
With populate()
User.findById(id).populate("watchHistory");
Output:
[
  {
    _id: "66a9f2c3e8a1c9a12f001234",
    title: "Intro to JS",
    duration: 10
  },
  {
    _id: "66a9f2c3e8a1c9a12f005678",
    title: "React Basics",
    duration: 15
  }
]
  🔥 Mongoose automatically replaces ObjectIds with actual Video documents.
*/ 
password:{
    type:String,
     required:[true,'pass is reuired']
},
refreshToken:{
    type:String
}
},{timestamps:true})
userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();
    this.password=bycrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bycrypt.compare(password,this.password)
}
    userSchema.methods.generateAccessToken=function(){
      return jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        }),
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    }
     userSchema.methods.generateRefreshToken=function(){
           jwt.sign({
            _id:this._id,
           }),
           process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:REFRESH_TOKEN_EXPIRY
           }
    }

export const User=mongoose.model("User",userSchema) 