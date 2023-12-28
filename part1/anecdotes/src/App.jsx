import { useState } from 'react'

const Title = ({text}) => (
  <h2>{text}</h2>
)


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Anecdotes = ({ text, vote }) => (
  <div>
    <p>{text}</p>
    <p>has {vote} votes.</p>
  </div>
)


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
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))


  const handleSelect = () => {
    const randomSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomSelected);
  }

  const handleVoted = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1
    setVoted(newVotes)
  }

  const mostVoteIdx = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdotes text={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={handleSelect} text="next anecdote" />
      <Button handleClick={handleVoted} text="vote" />
      <Title text="Anecdote with most votes" />
      <Anecdotes text={anecdotes[mostVoteIdx]} vote={votes[mostVoteIdx]} />
    </div>
  )
}

export default App