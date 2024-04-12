import { useState } from 'react'

const Buttom = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )  
}

const MostVoted = ({anecdotes, points}) => {
  let maxPoints = 0;
  let maxPointsIndex = 0;  
  const length = points.length;
  for (let i = 0; i<length; i++){       
    if(maxPoints<points[i]){      
      maxPoints = points[i];
      maxPointsIndex = i;
    }
  }
     
  return (
    <>
      <p>{anecdotes[maxPointsIndex]}</p>
      <p>has {maxPoints} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  
  const generarAnectode = () => {
    const num = Math.floor(Math.random() * 8);    
    setSelected(num);
  }

  const addPoint = () => {
    const copy = [ ...points ];    
    copy[selected] += 1;    
    setPoints(copy);    
  }

  return (
    <div>      
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Points: {points[selected]}</p>
      <Buttom handleClick={() => addPoint()} text={"Vote"}></Buttom>
      <Buttom handleClick={() => generarAnectode()} 
      text={"Next Anecdote"}>        
      </Buttom>

      <h2>Anecdote with the most votes</h2>
      <MostVoted anecdotes={anecdotes} points={points}></MostVoted>

    </div>
  )
}

export default App