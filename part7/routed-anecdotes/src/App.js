import React, { useState } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import useField from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  const id = useParams().id;
  return (
    <div>
      {anecdote.map((a) =>
        id === a.id ? (
          <div key={id}>
            <h2>
              {a.content} by {a.author}
            </h2>
            <p>has {a.votes} votes</p>
            <p>
              for more info see{" "}
              <a href={a.info} target="_blank" rel="noopener noreferrer">
                {a.info}
              </a>
            </p>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div style={{ paddingTop: "2em", lineHeight: "1.5em" }}>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . <br />
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const contentInput = useField("text");
  const authorInput = useField("text");
  const infoInput = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = contentInput.value;
    const author = authorInput.value;
    const info = infoInput.value;
    if (!content || !author || !info) return;
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    contentInput.reset();
    authorInput.reset();
    infoInput.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={contentInput.value}
            type={contentInput.type}
            onChange={contentInput.onChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={authorInput.value}
            type={authorInput.type}
            onChange={authorInput.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={infoInput.value}
            type={infoInput.type}
            onChange={infoInput.onChange}
          />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");
  const history = useHistory();

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    history.push("/");
    setNotification(`[${anecdote.content}] has been added!`);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <>
        <h1>Software anecdotes</h1>
        <Menu />
        <p style={{ color: "#6347ff", fontWeight: "bold" }}>{notification}</p>
      </>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          render={() => <Anecdote anecdote={anecdotes} />}
        />
        <Route exact path="/about" render={About} />
        <Route
          exact
          path="/create"
          render={() => <CreateNew addNew={addNew} />}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
