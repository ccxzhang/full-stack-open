interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];


const Header = ({ name }: { name: string }): JSX.Element => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
};


const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <h3>{course.name}: {course.exerciseCount}</h3>
        </div>
      );

    case "group":
      return (
        <div>
          <h3>{course.name}: {course.exerciseCount}</h3>
          project exercises {course.groupProjectCount}
        </div>
      );

    case "background":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p><i>{course.description}</i></p>
          <p>submit to {course.backgroundMaterial}</p>
        </div>
      );
    
    case "special":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p> {course.description} </p>
          <p> required skills: {course.requirements.join(", ")}</p>
        </div>
      )
  }
};

const Content = ({ courses }: { courses: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {courses.map(course => <Part course={course} />)}
    </div>
  )
}


const Total = ({ courses }: { courses: CoursePart[] }): JSX.Element => {
  const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <div>
      <h3>
        Number of exercises {totalExercises}
      </h3>
    </div>
  )
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
