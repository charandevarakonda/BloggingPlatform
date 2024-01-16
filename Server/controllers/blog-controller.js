import Blog from "../models/Blog.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const getblogs = async (req, res, next) => {
    let blogs;
    try {
      blogs = await Blog.find().populate("user");
  
      return res.status(200).json({ blogs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
      blog = await Blog.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!blog) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });
  };
  

  export const insertBlogs = async (req, res) => {
    const { title, description, image, user } = req.body;
    let existingUser;
  
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to find the User by Id" });
    }
  
    if (!existingUser) {
      return res.status(500).json({ message: "Unable to find the User by Id" });
    }
  
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
  
    try {
      const session = await mongoose.startSession(); // Corrected function name
      session.startTransaction();
      await blog.save({ session });
      existingUser.blog.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ blog });
  };
  

export const updateBlog=async(req,res)=>{
    const {title,description}=req.body
    const blogId=req.params.id;
    let blog;
    try{
       blog= await Blog.findByIdAndUpdate(blogId,{
        title,
        description
       }
       )
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to Update"})
    }

    return res.status(200).json({blog})

}


export const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    let blog;
  
    try {
      blog = await Blog.findByIdAndDelete(blogId).populate('user');
      
      if (blog && blog.user) {
        blog.user.blog.pull(blog);
        await blog.user.save();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to delete" });
    }
  
    if (!blog) {
      return res.status(500).json({ message: "Unable to delete" });
    }
  
    return res.status(200).json({ message: "Deleted" });
  };
  
  export const getByUserId=async(req,res)=>{
    const userid=req.params.id;
    let userblogs;
    try{
        userblogs=await User.findById(userid).populate("blog")
    }catch(err){
        return console.log(err);
    }
    if(!userblogs){
        return res.status(500).json({message:"No user found"})
    }
    return res.status(200).json({userblogs})
  }

