import express from "express"
import cors from "cors"
//CORS is a security rule in browsers that controls which websites can request data from your server.
//An origin =
//protocol + domain + port->   http://localhost:3000	origin A
//If a request goes from one origin to another, it is called Cross-Origin.
import cookieParser from "cookie-parser";
///A cookie is a small piece of data stored in the browser.
// Websites use cookies to store things like:
// login session
// user preferences
// authentication tokens
// Example cookie stored in browser:
//-------------------------------------
// What cookie-parser does
// It converts cookies into a JavaScript object.
// So instead of a string, you get:
// req.cookies = {
//   userId: "12345",
//   theme: "dark"
// }
// Much easier to use.
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({
    limit:"16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())
//example:
// const token = req.cookies.jwt;
// // 🔥 Very important for:
// // authentication
// // refresh tokens
// // session handling
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//routes import 
import userRouter from './routes/user.routes.js'
/*userRouter is an object that internally stores multiple routes.
Think of it like:
userRouter = {
   "/register": function,
   "/login": function
}
--------------------------------
/users + /register = /users/register
/users + /login    = /users/login
🔥 So When You Hit:
👉 POST http://localhost:8000/users/register
Flow:
app.use("/users", userRouter)
        ↓
router.route("/register").post(registerUser)     
        ↓
Controller runs
   */

app.use("/api/v1/users",userRouter)
//http://localhost:8000/api/v1/users/register
export {app}