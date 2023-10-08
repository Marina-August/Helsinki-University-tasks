import { useState } from 'react';
import Button from './components/Button';
import Statistics from './components/Statistics';  

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood =()=>{
    setGood(good+1);
    const good_ = good+1;
    setPositive(good_*100/(good_+neutral+bad));
    setAverage((good_- bad)/(good_+neutral+bad));
  }

  const handleNeutral =()=>{
    setNeutral(neutral+1);
    const neutral_ = neutral+1;
    setPositive(good*100/(good+neutral_+bad));
    setAverage((good-bad)/(good+neutral_+bad));
  }

  const handleBad =()=>{
    setBad(bad+1);
    const bad_ = bad+1;
    setPositive(good*100/(good+neutral+bad_));
    setAverage((good-bad_)/(good+neutral+bad_));
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      {good>0 || neutral>0 || bad>0 ? 
        <Statistics all={good+neutral+bad} good={good} neutral={neutral} bad={bad} positive={positive} average={average}/> :
        <h2>No feedback given</h2>
      }
    </div>
  )
}

export default App