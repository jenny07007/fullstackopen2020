##### My submissions for [Fullstack Open 2020](https://fullstack-hy2020.github.io/en/)

- Before the part 4,the submissions will be the same to 2019, as the material of 2020 does not have big changes before then.

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

### Part6

- Flux-architecture and Redux
- reducers, connect
- communicating with server in a redux app
