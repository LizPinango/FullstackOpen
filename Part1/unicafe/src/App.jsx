import { useState } from 'react'

const Buttom = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )  
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>      
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + bad + neutral; 
  let pr = (good*100)/total;
  let average = (good-bad)/total;

  if (total === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticsLine text={"Good"} value={good}></StatisticsLine>
          <StatisticsLine text={"Neutral"} value={neutral}></StatisticsLine>
          <StatisticsLine text={"Bad"} value={bad}></StatisticsLine>
          <StatisticsLine text={"Total"} value={total}></StatisticsLine>
          <StatisticsLine text={"Average"} value={average}></StatisticsLine>
          <StatisticsLine text={"Positives (%)"} value={pr}></StatisticsLine>
        </tbody>        
      </table>                 
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>UniCafe</h1>
      
      <h2>Give FeedBack</h2>

      <Buttom handleClick={()=> setGood(good + 1)} text={"Good"}></Buttom>
      <Buttom handleClick={()=> setNeutral(neutral + 1)} text={"Neutral"}></Buttom>
      <Buttom handleClick={()=> setBad(bad + 1)} text={"Bad"}></Buttom>
                 
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      
    </div>
  )
}

export default App