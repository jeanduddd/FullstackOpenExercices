import Part from "./Part"

const Content = (props) => {
  return (
    <>
        {props.parts.map(part => <Part key={part.id} part={part}></Part>)}
    </>
  )
}

export default Content