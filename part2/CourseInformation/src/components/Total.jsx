const Total = (props) => {
  
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0);
  
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

export default Total