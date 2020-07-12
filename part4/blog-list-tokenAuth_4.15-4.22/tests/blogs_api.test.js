const mongoose = require("mongoose");
const helper = require("./blogstest_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");

// 4.8
test("blogs are returened as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("status code is returned as 200", async () => {
  const res = await api.get("/api/blogs");

  expect(res.status[200]);
});

// 4.9
// eslint-disable-next-line no-unused-vars
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

beforeEach(async () => {
  await Blog.deleteMany({});

  // 2 different styles but do the same job
  await new Blog(helper.initialBlogs[0]).save();
  const blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs have an id property", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body[0].id).toBeDefined();
});

// 4.10
test("add a new blog post", async () => {
  const newPost = {
    title: "async/await simplified making async calls",
    author: "Mr. Hello",
    url: "https://addNewPost.com",
    likes: 1
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain("async/await simplified making async calls");
});

// 4.11
test("on if likes are missing", async () => {
  const missLikePost = {
    title: "No likes",
    author: "Miss Likes",
    url: "https://api/nolikes"
  };

  await api
    .post("/api/blogs")
    .send(missLikePost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  if (!blogsAtEnd.likes) return 0;
  expect(blogsAtEnd.likes).toBe(0);
});

// 4.12
test("on returning 400 when the title and url are missing from the request", async () => {
  const newPost = {
    author: "Mr. Missing",
    likes: 1
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

//4.13
test("on deleting a note with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).not.toContain(blogToDelete.title);
});

// 4.14
test("on updating the information of a blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogsToEdit = blogsAtStart[0];

  await api
    .patch(`/api/blogs/${blogsToEdit.id}`)
    .send({
      likes: blogsToEdit.likes + 5
    })
    .expect(200);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes + 5);
});

// 4.22
test("should fail and return proper status code when adding a new post without the token ", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const newPost = {
    title: "async/await simplified making async calls",
    author: "Mr. Hello",
    url: "https://addNewPost.com"
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(blogsAtStart.length);
});

afterAll(() => mongoose.connection.close());
