const Blog = require("../models/Blog");
const User = require("../models/User");

const initialBlogs = [
  {
    title: "Fullstackopen is awesome",
    author: "Steven Pinker",
    url: "https://fullstackopen.com",
    likes: 5
  },
  {
    title: "React is nice",
    author: "Jobs",
    url: "https://react.com",
    likes: 2
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "async/await simplified making async calls",
    author: "Mr. Hello",
    url: "https://addNewPost.com",
    likes: 1
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb };
