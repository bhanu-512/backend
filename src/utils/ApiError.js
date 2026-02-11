class ApiError extends Error{
constructor(
    statusCode,
    message="Something went wrong",
    error=[],
    stack=""
){
    super(message)
    this.statusCode=statusCode
    this.data=null
    this.message=message
    this.success=false
    this.errors=this.errors
    if(stack){
        this.stack=stack
    }else{
     Error.captureStackTrace(this,this.constructor)
    }
}
}
export {ApiError}
/*This is a custom error class for your backend APIs.
It lets you throw structured errors like:
status code (400, 401, 404, 500…)
message
success flag
error details
Instead of throwing random strings.
------------------------------------------------
*/
 /*
   (ApiError  →  Error Middleware  →  HTTP Response  →  Client)
   impt----""res.status().json() builds the HTTP response using information from the ApiError object"".
1️⃣ Throwing the error (inside controllers)
import { ApiError } from "../utils/ApiError.js";
if (!user) {
  throw new ApiError(404, "User not found");
}
Or:
if (!email || !password) {
  throw new ApiError(400, "All fields are required");
}
  ----------------------------------------------
app.use((err, req, res, next) => { ... })
What it is
A special Express middleware

Runs only when an error occurs

What it does
Catches any error
Converts it into an HTTP response
Where it lives
👉 Near the end of your app setup
app.use(errorHandler);
--------------------------------
throw new ApiError() = filing a complaint 📝
You write:
severity (404)
message
details
But…
Error middleware = customer support desk 📞
They:
read the complaint
decide response format
talk to the customer (client)
You cannot skip customer support.
------------------------------------
1️⃣ ApiError is created
throw new ApiError(404, "Some message");
Creates a JavaScript object

Holds data: statusCode, message, errors

❌ Does NOT send a response

2️⃣ Error middleware receives it
(err, req, res, next) => { ... }

Here:
err === ApiError instance
3️⃣ res.status().json() creates the HTTP response
res.status(err.statusCode || 500).json({
  success: false,
  message: err.message,
  errors: err.errors
});


res.status() → sets HTTP status code

.json() → sends JSON body to client

This is the ONLY place response is sent
*/

