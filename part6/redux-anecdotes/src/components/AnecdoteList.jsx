import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


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

    const dispatch = useDispatch()

    const handleVote = (id) => {
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id);
        dispatch(showNotification(`you voted '${votedAnecdote.content}'`));
        setTimeout(() => {
            dispatch(showNotification(''));
        }, 5000);
        return dispatch(vote(id));
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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
