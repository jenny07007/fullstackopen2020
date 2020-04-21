# Exercises

- [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams)
- [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)
- [useRouteMatch](https://reacttraining.com/react-router/web/api/Hooks/useroutematch)

##

- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - verify that the application uses hooks correctly, has configured by `create-react-app`

#

- 7.1 routed anecdotes
  - add react-router to the application so that by clicking links in the `Menu` component the view can be changed
  - at the root of the application, show the list of anecdotes
  - the `Footer` component should always be shown at the bottom
  - the `create a new anecdote` component should be in the path - `http://localhost:3000/create`

#

- 7.2
  - show a single anecdote when users click the name of the anecdote

#

- 7.3
  - set a notification to show message in 10 seconds when users create a new anecdote

#

- 7.4- 7.6 anecdotes and hooks

  - use `useField` custom hook to simplify the anecdote creation form
  - save the new hook to path `/src/hooks/`
  - add a button to the form for clearing out all the input fields and implement the logic in `useField` hook with a `reset` operation
  - get rid of the `Invaild value for prop reset on <input> tag` error if it happens

  #

  - 7.7 country hook
    - implement a custom hook `useCountry` for searching the details of the country
    - use the api endpoint (https://restcountries.eu/rest/v2/name/aruba?fullText=true) to fetch country details in a `useEffect` hook in the custom hook

  #

  - 7.8 ultimate hooks
    - extract the code for communicating with the backend into its own `useResource` hook
    - testing at port 3005 so that the `useResoure` hook can be used both notes and phone numbers
