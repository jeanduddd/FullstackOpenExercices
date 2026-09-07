const Total = (props) => {
  const exercises = props.parts.map((part) => part.exercises)
  const sum = exercises.reduce((total, value) => total + value, 0);
  
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

export default Total