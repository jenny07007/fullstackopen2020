const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String
    published: Int!
    author: String!
    id: ID!
    genres: [String]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allbooks(author: String, genres: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
