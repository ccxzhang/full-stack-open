import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td> {props.text} </td>
    <td> {props.value} </td>
  </tr>
)

const Statistics = (props) => {
  const totalClicks = props.good + props.neutral + props.bad;
  if (totalClicks == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>

    )
  } else {

    const average = (props.good - props.bad) / totalClicks;
    const positiveRate = `${(props.good / totalClicks) * 100} %`;

    return (
      <div>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={totalClicks} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positiveRate} />
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClicks = () => setGood(good + 1)
  const handleNeutralClicks = () => setNeutral(neutral + 1)
  const handleBadClicks = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClicks} text="good" />
      <Button onClick={handleNeutralClicks} text="neutral" />
      <Button onClick={handleBadClicks} text="bad" />
      <h1> Statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App