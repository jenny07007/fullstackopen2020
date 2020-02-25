# Exercises

- 3.1 The phonebook backend - Implement a Node application that returns a hardcoded list of phonebook entries from the address `http://localhost:3000/api/persons`

#

- 3.2 The phonebook backend - Implement a page at address `http://localhost:3001/info` that shows the numbers of people from database, and the timestamp of processing the request

#

- 3.3 The phonebook backend - Implement functionality for displaying the information for a single phonebook entry `http://localhost:3001/api/persons/5` and server should respond with the appropriate status code

#

- 3.4 The phonebook backend - Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL. Test the functionailty works with either Postman or the Visual Studio Code REST client

#

- 3.5 The phonebook backend - Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address `http://localhost:3001/api/persons`. Generate a new id for the phonebook entry with `Math.random` function

#

- 3.6 The phonebook backend - implement error handling for creating new entries. If
  - The name or number is missing
  - The name already exists in the phonebook
    respond the appropriate status code and send back message `{error: 'name must be unique'}`

#

- 3.7+3.8 The phonebook backend - add `morgan` middleware to the application for logging. Configure morgan so it also shows the data sent in HTTP POST request
  - [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
  - [creating new tokens](https://github.com/expressjs/morgan#creating-new-tokens)

#

- 3.9 The phonebook backend - Make the backend work with the frontend

#

- 3.10 The phonebook backend - Deploy the backend to the interent, for example to Heroku

  - Procfile `web: node index.js`

  ```
    heroku create <appname>
    git remote -v
    git remote add heroku http://git.heroku.com/<appname>
    git push heroku master
    heroku open
    heroku logs --tail
  ```

#

- 3.11 The phonebook backend - Generate a production build of the frontend and add it to the internet application. Also make sure that the frontend still works locally.
  - add proxy at frontend
    ```json
    {
      "dependencies": {
        // ...
      },
      "scripts": {
        // ...
      },
      "proxy": "http://localhost:3001"
    }
    ```
  - make express show static content (add middleware at backend)
  ```javascript
  app.use(express.static("build"));
  ```
  - add a build script at backend because this approach (separate front and back)
  ```javascript
    "build:ui": "rm -rf build && cd ../frontend && npm run build --prod && cp -r build ../3.9-3.11",
  ```

#

- 3.12 create a mongo.js file that can be used for adding entries to the phonebook, and for listing all the existing entries in the phonebook
- `process.argv[]` to get the command-line parameters [process.argv](https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_argv)
- The correct place for closing the database connection is at the end of the callback function
- command line `node mongo.js <password> <name> <number>` to add a new person data
- `node mongo.js <passowrd>` to list all persons data

#

- 3.13 Change the fetching of all phonebook entries so that the data is fetched from the database. Verify that the frontend works after the changes have been made.
  - write all Mongoose-specific code into its own module
  - add `detenv` config

#

- 3.14 Change the backend so that new numbers are saved to the database. Verify frontend still works after the changes.
  - modify the `__v` and `_id` provided by mongodb
    ```javascript
    personSchema.set("toJSON", {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      }
    });
    ```
- 3.15 Change the backend so that deleting phonebook entries is reflected in the database. Verify that the frontend still works after making the changes.
  - The easiest way to delete a note from the database is with the `findByIdAndRemove`method

#

- 3.16 Move the error handling of the application to a new error handler middleware.

  ```javascript
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return response.status(400).send({ error: "malformatted id" });
    }
    next(error);
  };
  app.use(errorHandler);
  ```

  - The order of middleware loading

#

- 3.17 If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.
  - Modify data can be accomplished with the `findByIdAndUpdate` method
  - add the optional `{ new: true }` parameter, which will cause our event handler to be called with the new modified document instead of the original.

#

- 3.18 Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

#

- 3.19 The Phonebook database - add validation to the app, so that will make sure can only add one number for a person in the phonebook.
  - install [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator#readme)
  - if an HTTP POST request tries to add a name that is already in the phobebook, the server must respond with an appropriate status code and error message

#

- 3.20 The Phonebook database - Expand the validation so that the name stored in the database has to be at least three characters long, and the phone number must have at least 8 digits.
  - **Key point**: in the frontend to retrive backend's error message `error.response.data.error`

#

- 3.21 The Phonebook database - deploying the database backend to production
  - 💁🏼‍♀️ [ final app](https://phonebooookapi.herokuapp.com/)

#

- 3.22 Lint configuration
  - `npm install eslint --save-dev`
  - configuration with command `node_modules/.bin/eslint --init`
  ```
    ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
    ? What type of modules does your project use? CommonJS (require/exports)
    ? Which framework does your project use? None of these
    ? Does your project use TypeScript? No
    ? Where does your code run? Node
    ? How would you like to define a style for your project? Answer questions about your style
    ? What format do you want your config file to be in? JavaScript
    ? What style of indentation do you use? Spaces
    ? What quotes do you use for strings? Double
    ? What line endings do you use? Unix
    ? Do you require semicolons? Yes
  ```
  - Inspecting and validating `node_modules/.bin/eslint index.js`
  - Create a separate `npm scrpt` - `"lint": "eslint ."`
  - Create a `.eslintignore` file - `Build`
  - A better structure
    ```
      ├── index.js
      ├── app.js
      ├── build
      │   ├── ...
      ├── controllers
      │   └── Persons.js
      ├── models
      │   └── person.js
      ├── package-lock.json
      ├── package.json
      ├── utils
      │   ├── config.js
      │   └── middleware.js
    ```
