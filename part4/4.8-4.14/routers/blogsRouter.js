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
  if (!title || !url || !author) return res.status(400).json();

  try {
    const blog = new Blog({ title, author, url, likes });
    const newBlog = await blog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(201).json();
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(204).end();
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch("/:id", async (req, res, next) => {
  const content = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, content, {
      new: true
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
