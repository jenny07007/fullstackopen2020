##### My submissions for [Fullstack Open 2020](https://fullstack-hy2020.github.io/en/)

- Part 10 is an additional content added in late 2020, as React Native is not my learning priority at this moment, I will pass it for now.

---

### Part 0

- Fundamentals

### Part 1

- React
- Javascript
- State
- Hooks
- Props

### Part 2

- Modules
- Forms (Controlled)
- Fetch data from server
- Alter data in server
  - RESTful API
- Styling

### Part 3

- Node.js and Express
  - [transitive dependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
  - [semantic versioning](https://docs.npmjs.com/about-semantic-versioning)
  - Change a string into a number `Number(req.params.id)`
  - Server responds with stauts code when something wrong `res.status(404).end()`
  - Server responds with status code when deleting resources successfully `res.status(204).end()`
  - [REST client - Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - Receiving data - [body-parser](https://github.com/expressjs/body-parser)
  - Finding out what headers have been set in the HTTP Request when debugging `req.get('Content-Type')`
  - Spotting the missing Content-Type header `console.log(req.headers)`
  - The HTTP GET request should be [safe](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
  - The HTTP requests except POST should be **idempotent**
  - `POST` is the only HTTP request type that is neither safe nor idempotent.
- Deploying app to the interent
  - cors
  - add the `Procfile` file to the project's root
  - backend endpoints:
    - `https://phonebooookapi.herokuapp.com/`
    - `https://phonebooookapi.herokuapp.com/info`
    - `https://phonebooookapi.herokuapp.com/api/persons`
    - `https://phonebooookapi.herokuapp.com/api/persons/:id`
- Saving data to MongoDB
  - create a database on mongoDB
  - install mongoose
  - [validation functionaility in Mongoose](https://mongoosejs.com/docs/validation.html)
- Validation and ESLint
  - [rules](https://eslint.org/docs/rules/)
  - [Javascript style guide](https://github.com/airbnb/javascript)
  - [Airbnb's ESlint configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

### Part 4

- Structure of backend application
- Testing the backend
  - Mock database library - [mongo-mock](https://github.com/williamkapke/mongo-mock)
  - Integration testing - multiple components of the system are being tested as a group
  - Separate the `Logger` when doing tests
    - Logging services
      - [papertrail](https://www.papertrail.com/)
      - [graylog](https://www.graylog.org/)
- User administration
- Token authentication

### Part 5

- Login in frontend
  - JWT implementation
- props.children and proptypes
  - Togglable component
- Testing React apps
- End to End testing
  - [cypress](https://www.cypress.io/)
  - [the testing result video](https://raw.githubusercontent.com/jenny07007/fullstackopen2020/master/part5/bloglist-frontend/cypress/videos/blog_app_login_form.speck.js.mp4)

### Part6

- Flux-architecture and Redux
- reducers
- communicating with server in a redux app
- connect

### Part 7

- React-router
- Custom hooks
- More about styles
- Webpack
- Class components, Miscellaneous
- Extending the bloglist

### Part 8

- GraphQL server
- React and GraphQL
- Database and user administration
- Login and updating the cache
- Fragments and subscriptions

### Part 9

- Introduction
- First step with Typescript
- Typing the express app
- React with types

### Part 10

- Introduction to React Native
- Ract Native basics
- Communicating with server
- Testing and extending the application
