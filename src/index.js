import mongoose from mongoose
mongoose.connect()
import express from "express";
const app=express()
const port=3000
app.listen("port",()=>{
    console.log("hello there");
})
