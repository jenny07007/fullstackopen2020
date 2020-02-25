import React from "react";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div>
          <h2>{course.name}</h2>
          {course.parts.map(part => (
            <>
              <p key={part.id}>
                {part.name} - {part.exercises}
              </p>
            </>
          ))}
          <strong key={course.id}>{`total of ${course.parts.reduce(
            (acc, curr) => acc + curr.exercises,
            0
          )}`}</strong>
        </div>
      ))}
    </div>
  );
};

export default Course;
