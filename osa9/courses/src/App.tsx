import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]
const App = () => {
  const courseName = "Half Stack application development";
  const total: number = courseParts.reduce((carry,curr) => carry+curr.exerciseCount, 0);

  return (
    <div>
      <Header course={courseName}/>
      <Content courseParts = {courseParts}/>
      <Total total = {total} />
    </div>
  );
};


const Header = ({course}: {course: string}) => {
  return(
    <h1>{course}</h1>
  )
}

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
  return(
    <div>
      {courseParts.map(coursePart => <Part key={coursePart.name} part={coursePart}/> )}
    </div>
    
  )
}

const Total = ({total}: {total: number}) => {
  return(
    <p>
      Number of exercises{" "}
      {total}
    </p>
  )
}

const Part = ({part}: {part: CoursePart}) => {
  const base =  
  <div>
    <b>{part.name} {part.exerciseCount}</b>
  </div>

  switch(part.type) {
    case "normal": return(
      <div>
        {base}
        <div>
        <i>
          {part.description}
        </i>
        </div>
        <br></br>
      </div>
    )
    case "submission": return(
      <div>
        {base}
        <div>
        <i>
          {part.description}
        </i>
        </div>
        <div>
          submit to {part.exerciseSubmissionLink}
        </div>
        <br></br>
      </div>

    )

    case "groupProject": return(
      <div>
        {base}
        <div>
          project exercises {part.groupProjectCount}
        </div>
        <br></br>
      </div>
    )

    case "special": return(
      <div>
        {base}
        <div>
        <i>
          {part.description}
        </i>
        </div>
        <span>
        required skills: {part.requirements.join(', ')}
        </span>
      </div>
    )
  }
}

export default App;
