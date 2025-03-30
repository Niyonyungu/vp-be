import express from "express";
import blog from "../controllers/blogController.js";

const blogRoutes = express.Router();

blogRoutes.post("/", blog.createBlogPost)
blogRoutes.get("/", blog.getBlogPosts)
blogRoutes.get("/:slug", blog.getBlogPost)
blogRoutes.delete("/:id", blog.deleteBlogPost)
blogRoutes.put("/:id", blog.updateBlogPost)

export default blogRoutes;