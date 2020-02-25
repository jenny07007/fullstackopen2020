const listHelper = require("../utils/list_helper");
const fakeData = require("./fakeData");
// 4.3
test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

// 4.4
describe("total likes", () => {
  test("of empty list is zero", () => {
    const listWithOneBlog = [];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(0);
  });

  test("list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const listWithMultpleBlogs = fakeData.blogs;

    const result = listHelper.totalLikes(listWithMultpleBlogs);
    expect(result).toBe(36);
  });
});

// 4.5
describe("favorite blog", () => {
  test("returns null on a empty blog list", () => {
    const listWithOneBlog = [];

    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toBe(null);
  });

  test("returns the blog details on a one blog list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  });

  test("returns the blog details on the blog list with highest numbers of likes", () => {
    const listWithMultpleBlogs = fakeData.blogs;

    const result = listHelper.favoriteBlog(listWithMultpleBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
});

// 4.6
describe("most blogs", () => {
  test("returns null on a empty blog list", () => {
    const listWithOneBlog = [];

    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toBe(null);
  });

  test("returns the author and 1 when there is only one blog in the list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    });
  });

  test("returns the author with the number of blogs list on a list with multiple blogs", () => {
    const listWithMultpleBlogs = fakeData.blogs;

    const result = listHelper.mostBlogs(listWithMultpleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

// 4.7
describe("most likes", () => {
  test("returns null on a empty blog list", () => {
    const listWithOneBlog = [];

    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toBe(null);
  });

  test("returns the author and the number of likes when there is only one blog in the list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  });

  test("returns the author with the number of likes list on a list with multiple blogs", () => {
    const listWithMultpleBlogs = fakeData.blogs;

    const result = listHelper.mostLikes(listWithMultpleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 10
    });
  });
});
