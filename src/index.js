import dotenv from "dotenv"
import connectDB from "./db/db.js"
connectDB()
dotenv.config({
path:'./env'
})

// What dotenv/config does:
// Reads your .env file
// Loads values into process.env