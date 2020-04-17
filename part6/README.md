# Exercises

- 6.1 unicate revisited
  - implement the reducer and its tests
    - make sure the reducer is an `immutable function` with the `deep-freeze-library`
    - ensure all tests pass

#####

- dependencies:
  - [deep-freeze](https://github.com/substack/deep-freeze)- ensures the reducer has been correctly defined as a immutable function in test
  - [redux](https://github.com/reduxjs/redux)
  - [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)
  - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
  - [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event)

#

- 6.2 unicate revisited
  - implement the actual functionality of the application

#

- 6.3 - 6.8 anecotes
  - implement the functionality for voting anecdotes. the amount of votes must be saved to Redux-Store
  - implement the functionality for adding new anecdotes
  - make sure that the anecdotes are ordered by the number of votes
  - separate the creation of action-objects to 'action creator' functions, and place them at `src/reducers/anecdoteReducer.js`
  - separate the creation of new anecdotes into its own component called `AnecdoteForm`.
  - separate the rendering of the anecdote list into its own component called `AnecdoteList`.

#

- 6.9 - 6.12
  - using react dev tool. move defininf the Redux-store in its own file `store.js`
  - extending the notification component to render the message stored in the redux store
  - using `combine reducer`
  - using the noticication component to display a message for 5 seconds when a use votes for an anecdote or creates a new anecdote
  - create a new `Filter` component to filter anecdotes

#

- 6.13 - 6.14
  - fetching anecdotes from backend implemented using `json-server`
  - modify the creation of new anecdotes

#

- 6.15- 6.18

  - modify the initialization of redux-store using asynchronous action creators by implementing `redux-thunk`
  - modify the creation of a new anecdote using asynchronous action creators by implementing `redux-thunk`
  - save the voting changes to the backend by using `redux-thunk`
  - change the creation of notifications to be
    #####
    ```js
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
    ```
