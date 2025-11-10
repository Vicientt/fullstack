const Course = ({courses}) => {
  return(
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        const total = course.parts.reduce((s,p) => s + p.exercises, 0)
        return(
          <div key = {course.id}>
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map((part => <li key={part.id}>{part.name} {part.exercises}</li>))}
            </ul>
            <p>total of {total} exercises</p>
          </div>
        )
      })}
    </div>
  )
}

export default Course