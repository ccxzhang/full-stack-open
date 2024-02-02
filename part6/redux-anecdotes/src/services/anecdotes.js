import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVote = async (anecdote) => {
    const id = anecdote.id
    const content = {votes: anecdote.votes + 1}
    const response = await axios.patch(`${baseUrl}/${id}`, content)
    return response.data
}


export default {
    getAll,
    createNew,
    updateVote
}