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

#

### React and GraphQL

- [Apollo Client](https://www.apollographql.com/docs/react/)

```js
npm install --save @apollo/client graphql
```

```js
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});
```

- [usequery](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#usequery) - well suited for the query is done when the component is rendered
- [graphql fields](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#result)
- [uselazyquery](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#uselazyquery) - for the situations where the query is done only as required
- [graphql variables](https://graphql.org/learn/queries/#variables)
- [usemutation](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#usemutation)
- [localstate to Apollo Cache](https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/)

```js
query findPerson($nameToSearch: String!) {
findPerson(name: $nameToSearch) {
  phone
  address {
    street,
    city
  }
  }
}

// query variables
{
"nameToSearch": "Arto Hellas"
}
```

- Apollo client saves the responses of queries to [cache](https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-configuration/).

###

- **updating cache**

  1. make the query for all persons [poll](https://www.apollographql.com/docs/react/v3.0-beta/data/queries/#polling) the server

     - drawback: pointless web traffic

     ```js
     const reuslt = useQuery(ALL_PERSONS, {
       pollInterval: 2000,
     });
     ```

  2. use `useMutation` hook's [refetchQueries](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#params-2)

     - **Pros**: no extra web trafficm, cos queries are not done in case
     - **Cons**: if one user now updates the state of the server, the changes do not show to other users immediately

  ```js
  const ALL_PERSONS = gql`
    query {
      allPersons {
        name
        phone
        id
      }
    }
  `;

  const PersonForm = (props) => {
    //...
    const [createPerson] = useMuation(CREATE_PERSON, {
      refetchQueries: [{ query: ALL_PERSONS }],
    });
  };
  ```

###

- Handling mutation errors

  - `useMutation` hook's `OnError` [option](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#params-2)

  ```js
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => setError(error.graphQLError[0].message),
  });

  // render the error message
  const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    //...
    const notify = msg => {
      setErrorMessage(msg)
      setTimeout(() => setErrorMessage(null), 10000)
    },
    return {//...}

    // The error message component
    const Notify = ({ errorMessage }) => {
      if (!errorMessage) return null;
      return (
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )
    }
  }
  ```

### Database and user administration

- mongoose and apollo

```js
npm install mongoose mongoose-unique-validator
```

### User login

- every user has a friend list that only they can see

```gql
type User {
  username: String!
  friends: [Person!]!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  // ..
  me: User
}

type Mutation {
  // ...
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
```

### context

- the object returned by context is given to all resolvers as their third parameter
- context is the right place to do things which are shared by multiple resolvers, like [user identification](https://blog.apollographql.com/authorization-in-graphql-452b1c402a9?_ga=2.45656161.474875091.1550613879-1581139173.1549828167).
- in this case, the code sets the object corresponding to the user who made a request to the `currentUsr` field of the context. If there is no user made requests, the value of the `context` is undefined

```js
exports.context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id).populate(
      "friends"
    );
    return { currentUser };
  }
};
```

```js
Query: {
  // ...
  me: (root, args, { currentUser }) => {
    return currentUser
  }
},
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

#

- 8.8 - 8.12
  - Authors view
    - Implement an Authors view to show the details of all authors on a page
  - Books view
    - Implement a Books view to show on a page all other details of all books except their genres.
  - Adding a book
    - Implement a possibility to add new books to your application.
    - Make sure that the Authors and Books views are kept up to date after a new book is added.
  - Authors birth year
    - Implement a possibility to set authors birth year.
  - Authors birth year advanced
    - Change the birth year form so that a birth year can be set only for an existing author. Use select-tag, react-select library or some other mechanism.

#

- 8.13 - 8.16
  - change the library application saving the data to a database
  - complete the program and make all queries and mutations work
  - complete the program and handle validation errors
  - add user management to the app
