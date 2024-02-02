import { useSelector, useDispatch } from 'react-redux'
import { addVote, vote } from '../reducers/anecdoteReducer'
import { showNotification, setNotification } from '../reducers/notificationReducer'
import { createSelector } from '@reduxjs/toolkit'


const Anecdote = ({ anecdote, handleClick }) => (
    <div>
        <div> {anecdote.content} </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}> votes </button>
        </div>
    </div>
)


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter == '') {
            return state.anecdotes
        }
        const loweredFilter = state.filter.toLowerCase()
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(loweredFilter))
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => (b.votes - a.votes))

    const dispatch = useDispatch()

    const handleVote = async (id) => {
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id);
        dispatch(addVote(votedAnecdote));
        dispatch(setNotification(`you voted '${votedAnecdote.content}'`));
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote.id)}
                />
            )}
        </div>
    )
}

export default AnecdoteList
