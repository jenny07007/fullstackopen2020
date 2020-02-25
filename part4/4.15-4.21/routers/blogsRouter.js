const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return !blogs.length
    ? res.json({ error: "no blogs yet" })
    : res.json(blogs.map(blog => blog));
});

blogsRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;

  if (!title || !url || !author) return res.status(400).json();

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET);
    if (!(token || decodeToken.id)) {
      return res.status(401).json({ error: "token is missing or invalid" });
    }

    const user = await User.findById(decodeToken.id);
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    });

    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const token = req.token;
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET);
    if (!(token || decodeToken.id)) {
      return res.status(401).json({ error: "token is missing or invalid" });
    }
    const user = await User.findById(decodeToken.id);
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(204).end();

    if (user.id.toString() !== blog.user.toString()) {
      return res.status(401).json({ error: "Unanthorized user token" });
    }

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
