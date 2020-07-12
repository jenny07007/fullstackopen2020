const { gql } = require("apollo-server");
const uuid = require("uuid/v4");
let { authors, books } = require("./data");

exports.resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allbooks: (root, args) => {
      return args.author
        ? books.filter((b) => b.author === args.author)
        : args.genre
        ? books.filter((g) => g.genre.includes(args.genre))
        : books;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      const existingAuthor = authors.find((a) => a.name === args.author);
      if (!existingAuthor) {
        const newAuthor = { name: args.author, born: null, id: uuid() };
        authors = authors.concat(newAuthor);
      }
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) return null;

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};
