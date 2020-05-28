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
    genre: [String]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allbooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genre: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
