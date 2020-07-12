const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return !blogs.length
    ? res.send("<p>No blogs yet! Create one!</p>")
    : res.json(blogs.map(blog => blog));
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  try {
    const blog = new Blog({ title, author, url, likes });
    const newBlog = await blog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(201).json();
  }
});

module.exports = blogsRouter;
