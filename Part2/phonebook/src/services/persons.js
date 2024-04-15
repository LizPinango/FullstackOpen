import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {//funciona con el backend
    return axios.get(baseUrl)
}

const add = (object) => {
    return axios.post(baseUrl, object)
}

const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, object) => {
    return axios.put(`${baseUrl}/${id}`, object)
}

export default { getAll, add, deleteOne, update }