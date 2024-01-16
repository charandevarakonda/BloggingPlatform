import express from "express"
import { deleteBlog, getByUserId, getblogs, insertBlogs, updateBlog,getById } from "../controllers/blog-controller.js"

const blogRouter=express.Router()

blogRouter.get("/",getblogs)
blogRouter.get("/:id",getById)
blogRouter.post("/insertblog",insertBlogs)
blogRouter.put("/updateblog/:id",updateBlog)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",getByUserId)


export default blogRouter