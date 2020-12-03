interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseBaseDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartOne extends CourseBaseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseBaseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "Extra challenge";
  exerciseCount: number;
  stars: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
