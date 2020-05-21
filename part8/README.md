- Schema
  - type
  - Query
- Apollo Server

```js
  npm install --save apollo-server graphql
```

```js
const server = new ApolloServer({
  typeDefs, // contains graphQL schema
  resolvers, // contains the resolvers of server
});
```

- [Resolver](https://www.apollographql.com/docs/graphql-tools/resolvers/#Resolver-function-signature)
- A GraphQL-server must define resolvers for each field of each type in the schema
- [default resolvers](https://www.apollographql.com/docs/graphql-tools/resolvers/#default-resolver)
- [mutation](https://graphql.org/learn/queries/#mutations)
- [validation](https://graphql.org/learn/validation/)
- [error handling](https://www.apollographql.com/docs/apollo-server/data/errors/#gatsby-focus-wrapper)
- [enum](https://graphql.org/learn/schema/#enumeration-types)

```js
  fieldName(obj, args, context, info) { result }
```

# Exercises

- 8.1 - 8-7
  - Implement queries `bookCount` and `authorCount` which return the number of books and the number of authors.
  - Implement query `allBooks`, which returns the details of all books.
  - Implement query `allAuthors`, which returns the details of all authors. The response should include a field `bookCount` containing the number of books the author has written.
  - Modify the `allBooks` query so, that a user can give an optional parameter `author`. The response should include only books written by that author.
  - Modify the query `allBooks` so that a user can give an optional parameter `genre`. The response should include only books of that genre.
  - Implement mutation `addBook`
  - Implement mutation `editAuthor`, which can be used to set a birth year for an author.
    - if the correct author is found, returns the edited authr
    - if the author is not found, returns `null`
