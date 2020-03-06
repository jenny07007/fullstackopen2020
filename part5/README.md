# Exercises

- 5.1 Bloglist frontend

  - Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state `user`
  - if a user is not logged in, show log in form
  - if a user is logged in, show the user name and a list of blogs belong to the user

  #

  - 🌟 **my takeaways**
    - use `[name]: value` to handle multiple input values (may refactor to hooks later on)
    - need using `callback` function when updating the state based on the previous state
      ```javascript
      const onNewblogChange = e => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
      };
      ```

#

- 5.2 Bloglist frontend

  - use local storage to let a user's login/logout state permanent
    - Values in the storage stay even when the page is rerendered. The storage is [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)-specific so each web application has its own storage.
    - Values saved to the storage are [DOMstrings](https://developer.mozilla.org/en-US/docs/Web/API/DOMString), so we cannot save a JavaScript object as is. The object has to be first parsed to JSON with the method `JSON.stringify`. Correspondigly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with `JSON.parse`.

  ```javascript
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    window.localStorage.getItem('loggedUser', JSON.parse(user))
    window.localStorage.removeItem('loggedUser)
  ```

  - use `useEffect` hook to implement localStorage so that the application checks local storage if there is a stored user logged token when entering the page

#

- 5.3 Bloglist frontend
  - allow a logged-in user to add new blogs
  - implement token in the frontend so that users must have the `token` to create a new blog
    - we've got the `JWT token` object when users passed the password validation (at backend logginRouter through the `jwt.sign` function)
    - export the `setToken` function for the `handleLogin` event
    - set the config object with `headers: {Authorization: token}` in the `create` function

#

- 5.4 Bloglist frontend
  - implement notifications
    - successfully added a new blog
    - error states (wrong username/password)

#

- 5.5 Bloglist frontend

  - a `new blog` button to be able to toggle the create blog form that is hidden as default
  - `Togglable` component
  - if a component is defined with an automatically closing `/>` tag, the `props.children` is an empty array

#

- 5.6 Bloglist frontend
  - show all content in the blog list when the list has been clicked
  - reference to components with `ref`
    - `createRef` creates a `ref` that can be attached to React elements via the ref attrubute
    - `forwardRef` creates a React component that forwards the `ref` attribute it receives to another component below the tree. It is particularly useful in two scenarios:
      - Forwarding refs to DOM components
      - Forwarding refs in higher-order-components
  - `useImperativeHandle` [hook](https://reactjs.org/docs/hooks-reference.html#useimperativehandle) is used for defining functions in a component which can be invoked from outside of the component.

#

- 5.7 Bloglist frontend
  - implement the functionality of the `like` button
  - likes are increased by making an HTTP `PUT` request
  - `/api/blogs/:id`

#

- 5.8 Bloglist frontend
  - sorting the blog list order by numbers of `likes`

#

- 5.9 Bloglist frontend
  - add a `delete` button
  - implement the logic form deleting blog posts in the backend.

#

- 5.10 Bloglist frontend
  - show the button for deleting a blog post only if the blog post was added by the user.

#

- 5.11 Bloglist frontend
  - define PropTypes for one of the components of the application
  - `npm install prop-types`

#

- 5.12 BlogList frontend
  - add ESlint to the project. fix all the linter errors
  - `npm add --save-dev eslint-plugin-jest`
  ```js
  {
    "scripts": {
      ...
      "eslint": "eslint ."
  },
  ```

#

### teseting react app

- [jest](https://jestjs.io/)
- [enzyme](https://github.com/airbnb/enzyme) (doesn't support hooks properly )
- [react-testing-library](https://github.com/testing-library/react-testing-library)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```js
import { render } from "@testing-library/react";
```

- normally React components are rendered to the DOM. the render method we use to render the components is suitable for tests without rendering then to the DOM
- `render` returns an object that has several [properties](https://testing-library.com/docs/react-testing-library/api#render-result). one of the properties is called `container` which contains all of the HTML rendered by the component

#### running tests

- create-react-app configures tests to be run in watch mode by default, which means that the `npm test` command will not exit once the tests have finished, and will instead wait for changes to be made to the code.

  - run tests normally

  ```bash
    CI-true npm test
  ```

  - [watchman](https://facebook.github.io/watchman/)

#####

- three ways to test the content of components

  ```js
  // search for a matching text from the entire HTML code rendered by the component
  expect(component.container).toHaveTextContent("testing react app");

  // use `getByText` method returns the element that contains the given text
  // an exception occurs if no such element exists
  const element = component.getByText("testing react app");
  expect(element).toBeDefined();

  // search for a specific element that is rendered by the component with the `querySlector` method
  const title = component.container.querySelector(".title");
  expect(title).toHaveTextContent("testing react app");
  ```

- Debugging method
  - [debug](https://testing-library.com/docs/react-testing-library/api#debug)
- `prettyDOM` method
  - search for a smaller part of the component and print its HTML code
  - `import { prettyDOM } from '@testing-library/dom'` to search for a smaller part of the component and print its HTML code
- set up `setupTests.js` in the src/
  ```js
  import "@testing-library/jest-dom/extend-expect";
  ```

###

#### clicking buttons in tests

```js
  import { render, fireEvent } from '@testing-library/react
```

- the [fireEvent method](https://testing-library.com/docs/dom-testing-library/api-events#fireevent)
- using a [mock function](https://jestjs.io/docs/en/mock-functions.html)

```js
const mockHandler = jest.fn();
```

- the test finds the button based on the text from the rendered component and clicks the element

```js
const button = component.getByTest("like");
fireEvent.click(button);
```

- the exepction of the test verifies that mock function has been called exactly once

```js
expect(mockHandler.mock.calls.length).toBe(1);
```

- [Mock objects and functions](https://en.wikipedia.org/wiki/Mock_object) are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

- [toHaveStyle](https://www.npmjs.com/package/@testing-library/jest-dom#tohavestyle) to verify visible or invisble

#### testing forms

- In practice, we used `fireEvent` to create a click event for the button component. We can also use fireEvent to **simulate filling forms.**
- 💁🏼‍♀️ [react-testing-library-examples](https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples/tree/master/?module=%2Fsrc%2F__tests__%2Fon-change.js&previewwindow=tests)

###

```js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";

test("<NoteForm /> updates parent state and calls onSubmit", () => {
  const createNote = jest.fn();

  const component = render(<NoteForm createNote={createNote} />);

  const input = component.container.querySelector("input");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" }
  });
  fireEvent.submit(form);

  expect(createNote.mock.calls.length).toBe(1);
  expect(createNote.mock.calls[0][0].content).toBe(
    "testing of forms could be easier"
  );
});
```

#### test coverage

- [test coverage](https://github.com/facebook/create-react-app/blob/ed5c48c81b2139b4414810e1efe917e04c96ee8d/packages/react-scripts/template/README.md#coverage-reporting)

```js
  CI=true npm test -- --coverage
```

#### snapshot testing

- [snapshot testing](https://jestjs.io/docs/en/snapshot-testing.html)
  - to compare the HTML code defined by the component after it has changed to the HTML code that exists before

#

#

- 5.13 BlogList tests
  - write a test that verifies the component renders the title and author, but does not render its url or number of likes by default

#

- 5.14 BlogList tests
  - write a test that verifies if the url and number of likes are shown when cllicking for showing details

#

- 5.15 BlogList tests

  - write a test that ensures if the likes button is clicked twice, the props is called twice.

#

- 5.16 BlogList tests

  - write a test for the new blog form that passes right details as props when a new blog is called.

  ####

  - you give an input element id `author`

  ```js
  <input id="author" value={author} onChange={() => {}} />
  ```

  - then you can access the contents with

  ```js
  const author = component.container.querySelector("#author");
  ```

#

#### [2020new] end-to-end tests

- inspects the application through the same interface as real end-users
- [system as a whole](https://en.wikipedia.org/wiki/System_testing)
- [selenium](https://www.selenium.dev/)
- [headless browser](https://en.wikipedia.org/wiki/Headless_browser) - browsers with no graphical user interface.
- [regression testing](https://en.wikipedia.org/wiki/Regression_testing)

###

- [cypress](https://www.cypress.io/)

  - can be in the frontend or the backend repository
  - do not start the system when they are running
  -

  ```js
    npm install --save-dev cypress
  ```

  - config frontend

  ```json
  {
    // ...
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "server": "json-server -p3001 db.json",
      "cypress:open": "cypress open"
    }
    // ...
  }
  ```

  - config backend, starts in the test mode

  ```json
    {
    // ...
    "scripts": {
      "start": "cross-env NODE_ENV=production node index.js",
      "dev": "cross-env NODE_ENV=development nodemon index.js",
      "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
      "deploy": "git push heroku master",
      "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
      "logs:prod": "heroku logs --tail",
      "lint": "eslint .",
      "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
      "start:test": "cross-env NODE_ENV=test node index.js"
      },
  ```

  - start Cypress w/ the commmand

  ```bash
    npm run cypress:open
  ```

- When we first run Cypress, it creates a cypress directory. It contains a `integrations` subdirectory, where we will place our tests.

###

- [cy.visit](https://docs.cypress.io/api/commands/visit.html#Syntax) - opens the web address given to it as a parameter on the browser used by the test.
- [cy.contains](https://docs.cypress.io/api/commands/contains.html#Syntax) - searches for the string it received as a parameter from the page.
- Mocha [recommends](https://mochajs.org/#arrow-functions) that arrow functions are not used, because they might cause some issues in certain situations.

```js
describe("Note app", function() {
  it("front page can be opened", function() {
    cy.visit("http://localhost:3000");
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2020"
    );
  });

  it("front page contains random text", function() {
    cy.visit("http://localhost:3000");
    cy.contains("wtf is this app?");
  });
});
```

### writing to a form

- [cy.click](https://docs.cypress.io/api/commands/click.html#Syntax)
- [cy.get](https://docs.cypress.io/api/commands/get.html#Syntax) - searching elements by CSS selectors
- [cy.type](https://docs.cypress.io/api/commands/type.html#Syntax)

```js
beforeEach(function() {
  cy.visit("http://localhost:3000");
});
```

```js
describe("Note app", function() {
  // ..
  it("user can log in", function() {
    // open the login form
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    // the form is submitted by clicking the submit button
    cy.get("#login-button").click();

    // ensures login was successful
    cy.contains("Matti Luukkainen logged in");
  });
});
```

### Eslint error about the variable `cy`

- install `eslint-plugin-cypress`
  ```bash
  npm install eslint-plugin-cypress --save-dev
  ```
- in the `.eslintrc.js`

  ```json
  (module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true
    },
    "extends": [
      // ...
    ],
    "parserOptions": {
      // ...
    },
    "plugins": ["react", "jest", "cypress"],
    "rules": {
      // ...
    }
  })
  ```

### Controlling the state of the database

- create API endpoints to the backend to empty the database
- `/api/testing/reset`
- [cy.request](https://docs.cypress.io/api/commands/request.html)

```js
//...
router.post("/reset", async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
```

- add it to the backend

```js
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
//...
```

- add user data from backend

```js
beforeEach(function() {
  cy.request("POST", "http://localhost:3001/api/testing/reset");
  const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen"
  };
  cy.request("POST", "http://localhost:3001/api/users/", user);
  cy.visit("http://localhost:3000");
});
```

### Failed login test

- `it.only` to run only required test. when the test is working, we can remove it
- [should()](https://docs.cypress.io/api/commands/should.html#Syntax)
- [Common Assertions with should()](https://docs.cypress.io/guides/references/assertions.html#Common-Assertions)
- [and()](https://docs.cypress.io/api/commands/and.html#Syntax)

```js
  describe('Note app', function() {
  // ...

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    // to ensure the app will print the error msg
    cy.get(".error").contains("wrong credentials");
    // or using `should` and chain then using `and`
    cy.get(".error")
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    //`should` always be used chained with `get` (or another chainable command).
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  // ...
)}
```

### bypassing the UI

- [bypassing the UI](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in) - because it's much faster logging in with a HTTP request than a form
- `cy.request` like all Cypress commands are `Promises`
- save user login info into localstorage

  ```js
  beforeEach(function() {
    cy.login({ username: "mluukkai", password: "salainen" });
  });
  ```

- add a custom command because the login code will be used in multiple places when we wrtie new tests
- `cypress/support/commands.js`

  ```js
  Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3001/api/login", {
      username,
      password
    }).then(({ body }) => {
      localStorage.setItem("loggedNoteappUser", JSON.stringify(body));
      cy.visit("http://localhost:3000");
    });
  });
  ```

- other useful commands
  - [parent()](https://docs.cypress.io/api/commands/parent.html#Syntax)
  - [find()](https://docs.cypress.io/api/commands/parent.html#Syntax)
  - [as()](https://docs.cypress.io/api/commands/as.html#Syntax)

### run Cypress tests from CLI

```json
  "script: {
    //...
    "test:e2e": "cypress run"
  }
```

#

#

- 5.17 bloglist end to end testing
  - configure Cypress to the project
  - make a test for checking the app displays the login form by default

#

- 5.18 bloglist end to end testing
  - makes for logging in (uccessful and unsuccessful log in attempts)
  - make a new user in the `beforeEach` block for the tests
  - check the unsuccessful login notification is shown in red

#

- 5.19 bloglist end to end testing
  - make a test to check a logged-in user can create a new blog
  - the test has to ensure that a blog is added to the list of all blogs

#

- 5.20 bloglist end to end testing
  - make a test to check a user can like a blog

#

- 5.21 bloglist end to end testing
  - make a test to ensure a user can delete a blog
  - also check other users cannot delete the blog

#

- 5.22 bloglist end to end testing
  - make a test to check the order of blogs is based on the number of likes with a descending order
