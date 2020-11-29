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

### login and update cache - frontend

- [resetStore](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore) - resets the entire store by clearing out cache and re-executing all active queries.
- [useApolloClient](https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient) - to access client

### add a token to a header

- the link parameter given to the `client` object defines who apollo connects to the server

- [httpLink](https://www.apollographql.com/docs/link/links/http/)
- [header](https://www.apollographql.com/docs/react/networking/authentication/#header)

```bash
npm install apollo-link-context
```

```js
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const HttpLink = new HttpLink({ uri: "http://localhost:4000" });
```

### a better solution for updating cache

- [writeQuery](https://www.apollographql.com/docs/react/caching/cache-interaction/#writequery-and-writefragment)
- [readQuery](https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-interaction/#readquery)
- [fetchPolicy](https://www.apollographql.com/docs/react/api/react-apollo/#optionsfetchpolicy)

###

- the callback function is given a reference to the cache and the data returned by the mutation as parameters.
- it's possible to disable cache for the whole app or a single query [fetchPolicy](https://www.apollographql.com/docs/react/api/react/hooks/#options) as `no-cache`

```js
const [createPerson] = useMutation(CREATE_PERSON, {
  refetchQueries: [{ query: ALL_PERSONS }],
  onError: (error) => setError(error.graphQLErrors[0].message), // handling error
  update: (store, response) => {
    // a suitable update callback
    const dataInStore = store.readQuery({ query: ALL_PERSONS }); // reads the cached state
    store.writeQuery({
      // updates the cache adding the new person to the cached data
      query: ALL_PERSONS,
      data: {
        ...dataInStore,
        allPersons: [...dataInStore.allPersons, response.data.addPerson],
      },
    });
  },
});
```

### Fragments

- [fragments](https://graphql.org/learn/queries/#fragments)
- constructs sets of fields and includes them in queries where needed
- The fragments are not defined in the GraphQL schema, but in the client
- The fragments must be declared when the client uses them for queries.

```js
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

//
const ALL_PERSONS = gql`
  {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;
```

### Subscriptions

- [subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [WebSockets ](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- subscribe to updates about changes in the server

- [Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
- [PubSub interface](https://www.apollographql.com/docs/graphql-subscriptions/setup/#setup)
- [iterator object](https://www.apollographql.com/docs/graphql-subscriptions/subscriptions-to-schema/)

- on the server

```js
type Subscription {
  personAdded: Person!
}

//
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

Mutation: {
  addPerson: async (root, args, context) => {
    //...
  }
  // publishes a notification about the operation to all subscribers with PubSub's method `publish`
  pubsub.publish('PERSON_ADDED', { personAdded: person })
  return person
 }
},
 Subscription: {
   personAdded: {
     subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
     },
  },

  // server listens for subscriptions in the address ws://localhost:4000/graphql
  server.listen().then(({ url, subscriptionsUrl }) => {  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)})
```

- on the client

```js
// index.js
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

// WebSocket connection
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
```

```
npm install @apollo/client subscriptions-transport-ws
```

```js
// queryies
export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

//App.js
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

const App = () => {
  // ...

  // render view immediately as a person is added to Apollo cache
  const updateCacheWith = (addedPerson) => {
    // ensure not add the new person to the cache twice
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(PERSON_ADDED, {
    // When a new person is added, the server sends a notification to the client, and the callback-function defined in the onSubscriptionData attribute is called and given the details of the new person as parameters.
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });
};

// the 'updateCacheWith' can also be used in other components for the cache update
const PersonForm = ({ setError, updateCacheWith }) => {
  // ...
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addPerson);
    },
  });
  // ..
};
```

### n + 1 problem

- [dataloader](https://github.com/graphql/dataloader)
- Dataloader with Apollo server [here](https://www.robinwieruch.de/graphql-apollo-server-tutorial#graphql-server-data-loader-caching-batching) and [here](http://www.petecorey.com/blog/2017/08/14/batching-graphql-queries-with-dataloader/)

### structures of GraphQL applications

- [server](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2/)
- [client](https://medium.com/@peterpme/thoughts-on-structuring-your-apollo-queries-mutations-939ba4746cd8)

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

#

- 8.17 - 8.22

  - config with backend that updated from 8.13-8.16
  - implement login functionality and fix the mutations.
  - filtering the book list by genre
  - show a view that all books are based the logged in user's favourite genres
  - filtering books in the recommendations page using a GraphQL query to the server
    - might consider use the `useLazyQuery` rather than `useQuery` hook
    - might be useful to save the results of a GQL query to the state of a component
    - can do GQL queries in a `useEffect` hook
    - the second parameter of `useEffect` hook can become handy depending on apporaches
  - up to date cache and book recommendatiions

- 8.23 - 8.26
  - implement subscription `bookAdded` on server, and returns the details of all new books to its subscribers
  - subscribe to `bookAdded` in the client.
    - when new books are added, show a notification to the user
  - keep the application's view updating when the server notifies there is a new book has been added
  - solve the `n+1` problem
    ```js
    query {
      allAuthors {
        name
        bookCount
      }
    }
    ```
