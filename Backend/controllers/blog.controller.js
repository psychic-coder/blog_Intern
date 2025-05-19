import { TryCatch } from "../middlewares/error.js";
import Blog from "../models/blogModel.js";

export const saveBlog = async (req, res) => {
  try {
    const { title, content, tags, status = "draft" } = req.body;
    console.log(req.user.id)
    const userId = req.user.id;
    if (!["draft", "published"].includes(status)) {
      return res
        .status(400)
        .json({ error: 'Invalid status. Must be "draft" or "published"' });
    }

    const blog = new Blog({
      title,
      content,
      tags,
      author: userId,
      status,
      ...(status === "published" && { published_at: new Date() }),
      updated_at: new Date(),
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({
      error: `Failed to save blog`,
      message: err.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  const { title, content, tags, status } = req.body;
  const userId = req.user.id;

  try {
    if (status && !["draft", "published"].includes(status)) {
      return res
        .status(400)
        .json({ error: 'Invalid status. Must be "draft" or "published"' });
    }

    const updateFields = {
      ...(title && { title }),
      ...(content && { content }),
      ...(tags && { tags }),
      ...(status && { status }),
      updated_at: new Date(),
    };

    if (status === "published") {
      updateFields.published_at = new Date();
    }

    const blog = await Blog.findOneAndUpdate(
      { _id: blogId, author: userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found or unauthorized" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({
      error: "Failed to update blog",
      message: err.message,
    });
  }
};


export const getBlog=async(req,res)=>{
  try {
    const blogs = await Blog.find().populate("author");
    const published=blogs.filter(blog=>blog.status==="published");
    const draft=blogs.filter(blog=>blog.status==="draft");
    res.status(200).json({
      published,
      draft,
      message:"Fetched Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message:"Error in fetching the blogs"
    })
  }
}


export const getBlogById=TryCatch(async(req,res)=>{
  const {blogId}=req.params;
  const blog=await Blog.findById(blogId).populate("author");
  if(!blog){
    return res.status(404).error({
      error:"Blog Not Found"
    })
  };
  res.status(200).json({
    message:"Found the Blog",
    blog,
    success:true
  })
})