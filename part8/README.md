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
-

```js
  fieldName(obj, args, context, info) { result }
```

# Exercises
