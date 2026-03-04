import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js"
const router=Router();

router.route("/register").post(registerUser)
export default router


/*
Client (frontend / Postman)
        ↓
POST request → /register
        ↓
Express router matches the route
        ↓
registerUser controller execute
----------------------------------------------j------
router.route("/register").post(registerUser)
What this line means
This line tells Express:
👉 When a POST request comes to /register, run the function registerUser.

So the flow is:

Client (frontend) 
        ↓
POST request → /register
        ↓
Express Router
        ↓
registerUser controller runs
-------------------------------------------------------------
router.get("/", userController.getUsers);
is the same as writing:

router.get("/", (req, res) => {
    res.json({ message: "All users" });
});
But instead of writing function inline,
we moved it to a separate file.*/