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

const StatisticLine = ({name, value}) => {
  return (
    <>
      <td>{name}</td>
      <td>{value} {name === 'positive' ? '%' : '' }</td>
    </>
  )
}

const Statistics = ({good,neutral,bad}) => {

  const total = good+neutral+bad
  const average = total === 0 ? 0 : (good-bad)/total
  const positive = total === 0 ? 0 : (good/total)*100

  return (
    <table>
      <thead>
        <tr>
          <StatisticLine name="good" value={good}></StatisticLine>
        </tr>
        <tr>
          <StatisticLine name="neutral" value={neutral}></StatisticLine>
        </tr>
        <tr>
          <StatisticLine name="bad" value={bad}></StatisticLine>
        </tr>
        <tr>
          <StatisticLine name="total" value={total}></StatisticLine>
        </tr>
        <tr>
          <StatisticLine name="average" value={average}></StatisticLine>
        </tr>
        <tr>
          <StatisticLine name="positive" value={positive}></StatisticLine>
        </tr> 
      </thead>
    </table>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => addOne(setGood, good)} name='good'></Button>
        <Button onClick={() => addOne(setNeutral, neutral)} name='neutral'></Button>
        <Button onClick={() => addOne(setBad, bad)} name='bad'></Button>
      </div>
      <h2>statistics</h2>
      {good == 0 && neutral == 0 && bad == 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      )}
    </div>
  )
}

export default App
