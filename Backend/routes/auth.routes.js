import express from "express"
import { login, signup } from "../controllers/auth.controller.js";


const router=express.Router();


router.post("/signin",signup);
router.post("/login",login)



export default router;

