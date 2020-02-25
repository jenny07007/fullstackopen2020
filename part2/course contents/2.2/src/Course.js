import React from "react";

const Course = ({ course }) => {
  const renderTotal = () => {
    return course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  };
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => (
        <>
          <p key={part.id}>
            {part.name} - {part.exercises}
          </p>
        </>
      ))}
      <strong>{`total of ${renderTotal()}`}</strong>
    </div>
  );
};

export default Course;
