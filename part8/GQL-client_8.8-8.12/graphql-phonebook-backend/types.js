const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type Address {
    street: String!
    city: String!
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;
