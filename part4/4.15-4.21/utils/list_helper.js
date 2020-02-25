const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = blogs => {
  if (!blogs.length) return null;

  const popularBlog = blogs.reduce((prev, curr) =>
    curr.likes > prev.likes ? curr : prev
  );

  return {
    title: popularBlog.title,
    author: popularBlog.author,
    likes: popularBlog.likes
  };
};

const mostBlogs = blogs => {
  if (!blogs.length) return null;

  const numOfBlogsWithAuthor = blogs.reduce((acc, curr) => {
    if (!acc[curr["author"]]) {
      acc[curr["author"]] = 0;
    }
    acc[curr["author"]]++;
    return acc;
  }, {});

  const mostBlogsAuthor = Object.keys(
    numOfBlogsWithAuthor
  ).reduce((prev, curr) =>
    numOfBlogsWithAuthor[prev] > numOfBlogsWithAuthor[curr] ? prev : curr
  );

  return {
    author: mostBlogsAuthor,
    blogs: numOfBlogsWithAuthor[mostBlogsAuthor]
  };
};

const mostLikes = blogs => {
  if (!blogs.length) return null;

  const numOfBlogsWithAuthor = blogs.reduce((acc, curr) => {
    if (!acc[curr["author"]]) {
      acc[curr["author"]] = 0;
    }
    acc[curr["author"]]++;
    return acc;
  }, {});

  const mostBlogsAuthor = Object.keys(
    numOfBlogsWithAuthor
  ).reduce((prev, curr) =>
    numOfBlogsWithAuthor[prev] > numOfBlogsWithAuthor[curr] ? prev : curr
  );

  const mostLikesOfPopAuthor = blogs
    .filter(blog => blog.author === mostBlogsAuthor)
    .reduce((a, b) => (a.likes > b.likes ? a : b));

  return {
    author: mostBlogsAuthor,
    likes: mostLikesOfPopAuthor.likes
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
