import { useState } from 'react'
import Button from './components/Button'

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
  const initialPoints = Array(anecdotes.length).fill(0);
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialPoints);
  const [maxVotes, setMaxVotes] = useState(0);
  const [maxVotesAnecdote, setMaxVotesAnecdote] = useState(0);

  const handleRandomNumber = () => {
     let number = Math.floor(Math.random() * anecdotes.length);
     setSelected(number);
  }

  const maximumVotes = (points)=>{
      let max = points[0];
      let anecdote = 0;
      for (let i = 0; i < points.length; i++){
        if (points[i] > max){
          max = points[i];
          anecdote = i;
        }
      }
      setMaxVotes(max);
      setMaxVotesAnecdote(anecdote);
  }

  const handleVote = () => {
        const points = [...votes];
        points[selected]++;
        setVotes(points);
        maximumVotes(points);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has <b>{votes[selected]}</b> votes</p>
      <Button handleClick={handleVote} text='vote'/>
      <Button handleClick={handleRandomNumber} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesAnecdote]}</p>
      <p>has <b>{maxVotes}</b> votes</p>
    </div>
  )
}

export default App;