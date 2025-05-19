import express from "express";
import { getBlog, getBlogById, saveBlog, updateBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();

router.post('/createNew',verifyToken,saveBlog)
router.post("/update/:blogId",verifyToken,updateBlog)
router.get("/getAllBlogs/",getBlog)
router.get("/getAllBlogs/:blogId",getBlogById)


export default router;