import dotenv from "dotenv"
import connectDB from "./db/db.js"
const app=express();
dotenv.config({
path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log("running")
    })
})
.catch((err)=>{
    console.log("mongo failed:",err)
})

// What dotenv/config does:
// Reads your .env file
// Loads values into process.env