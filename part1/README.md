# Exercises

- 1.1 Use create-react-app to initialize a new application.

#

- 1.2 Refactor the `Content` component so that it does not render any names of parts or their number of exercises by itself. Instead it only renders three Part components of which each renders the name and number of exercises of one part.

#

- 1.3 Modify the variable definitions of the App component also refactor the application

#

- 1.4 Place the objects into an array

#

- 1.5 Change the course and its parts into a single Javascript object

#

- 1.6 unicafe - implement a web application for collecting customer feedback (good, neurtal, bad)

#

- 1.7 unicafe - expand the application so that it shows more statistics about the gathered feedback

#

- 1.8 unicafe - Refactor the application so that displaying the statistics is extracted into its own Statistics component.

#

- 1.9 unicafe - change the application to display statistics only once feedback has been gathered

#

- 1.10 unicafe - extract the following two components:
  - Button for defining the buttons used for submitting feedback
  - Statistic for displaying a single statistic

#

- 1.11 unicafe - display the statistics in an HTML table

#

- 1.12 anecdotes - add a button that can be clicked to display a random anecdote

#

- 1.13 anecdotes - add a button that can be clicked to vote for the displayed anecdote
  ```javascript
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

      	const handleVotes = () => {
      const newState = { ...votes };
      setVotes(newState, (newState[selected] = newState[selected] + 1 || 1));
      return newState;
      	};
      	```

#

- 1.14 anecdotes: display anecdote with largest numbers of votes
