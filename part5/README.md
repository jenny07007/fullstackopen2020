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
