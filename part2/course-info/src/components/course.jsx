export const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Total = ({ parts }) => {

  const total = parts.reduce((sum, current) => {
    return sum += current?.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = ({ part }) =>
  <p id={part?.id}>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />)}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
export default Course