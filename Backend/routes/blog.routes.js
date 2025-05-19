import express from "express";
import { saveBlog, updateBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();

router.post('/createNew',verifyToken,saveBlog)
router.post("/update/:blogId",verifyToken,updateBlog)


export default router;