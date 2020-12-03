import React from "react";
import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p style={{ paddingTop: "1rem" }}>
      <strong>
        Number of exercises:{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  );
};

export default Total;
