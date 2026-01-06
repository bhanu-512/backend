import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import express from "express"
const app=express()
const connectDB = async () => {
  try {
   const con=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    console.log(`MongoDB connected  ${con.connection.name}`)
  } catch (error) {
    console.error("MongoDB error", error)
    process.exit(1)
  }
}

export default connectDB
