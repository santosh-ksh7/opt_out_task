import express from "express";
import { loginUser, registerUser } from "../Controller/user.js";


const router = express.Router();


export const userRouter = router;


// API to register new user
router.post("/register", registerUser)



// API for login
router.post("/login", loginUser)