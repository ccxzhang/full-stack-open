import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   const anecdoteToAdd = asObject(action.payload)
    //   return state.concat(anecdoteToAdd);
    // },

    vote(state, action) {
      const changedAnecdote = action.payload
      const id = action.payload.id;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote));
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'ADD': {
//       const anecdoteToAdd = asObject(action.payload)
//       return state.concat(anecdoteToAdd);
//     }
//     case 'VOTE': {
//       const id = action.payload;
//       const anecdoteToChange = state.find(n => n.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote)
//     }

//     default:
//       return state;
//   }

// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: "ADD",
//     payload: { anecdote }
//   }
// }

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id }
//   }
// }

export const { vote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer