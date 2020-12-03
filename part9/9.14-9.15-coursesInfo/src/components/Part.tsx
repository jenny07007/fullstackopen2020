import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div className="box">
          <h3>{part.name}</h3>
          {part.description && <p>{part.description}</p>}
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div className="box">
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div className="box">
          <h3>{part.name}</h3>
          {part.description && <p>{part.description}</p>}
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            Submission Link: <br />
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    case "Extra challenge":
      return (
        <div className="box">
          <h3>{part.name}</h3>
          <p>{part.stars}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
