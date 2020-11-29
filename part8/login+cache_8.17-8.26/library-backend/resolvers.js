require("dotenv").config();
const {
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const pubsub = new PubSub();

exports.resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({
          author: author.id,
          genres: { $in: args.genres }, // using $in to match values in an array
        }).populate("author");
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author.id }).populate("author");
      } else if (args.genres) {
        return Book.find({ genres: { $in: args.genres } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async ({ name }) => {
      if (name.length < 4) {
        throw new UserInputError("author name is too short!");
      }
      const author = await Author.findOne({ name });
      return Book.find({ author }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const existingAuthor = await Author.findOne({ name: args.author });
      if (existingAuthor) {
        const book = new Book({ ...args, author: existingAuthor });
        try {
          return book.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      } else {
        const newAuthor = new Author({ name: args.author, born: null });
        let saveAuthor = null;
        try {
          saveAuthor = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }

        const book = new Book({ ...args, author: saveAuthor });
        try {
          pubsub.publish("BOOK_ADDED", { bookAdded: book });

          return book.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("please log in your account");
      }
      const author = await Author.findOne({ name });
      if (!author) {
        throw new UserInputError("author cannot be found");
      }
      try {
        return Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      // assuming all users have same hardcode pw
      if (!user || password !== "helloworld") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    createUser: async (root, { username, favoriteGenre }, { currentUser }) => {
      // using jwttoken, no need to save pw to db
      // can save hashed pw to db if using session based auth
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const user = new User({ username, favoriteGenre });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
