import { useState } from 'react'

const addOne = (updateFunction,paramToIncrease) => {
  updateFunction(paramToIncrease+1)
}

const Button = ({onClick, name}) => {
  return (
    <>
      <button onClick={onClick}>{name}</button>
    </>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+neutral+bad
  const average = total === 0 ? 0 : (good-bad)/total
  const positive = total === 0 ? 0 : (good/total)*100

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => addOne(setGood, good)} name='good'></Button>
        <Button onClick={() => addOne(setNeutral, neutral)} name='neutral'></Button>
        <Button onClick={() => addOne(setBad, bad)} name='bad'></Button>
      </div>
      <h2>statistics</h2>
      <p style={{margin: 0}}>good {good}</p>
      <p style={{margin: 0}}>neutral {neutral}</p>
      <p style={{margin: 0}}>bad {bad}</p>
      <p style={{margin: 0}}>total {total}</p>
      <p style={{margin: 0}}>average {average}</p>
      <p style={{margin: 0}}>positive {positive} %</p>
    </div>
  )
}

export default App