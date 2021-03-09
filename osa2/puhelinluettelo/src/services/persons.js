import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (person) => {
  const request = axios.post(baseUrl, person)
  return request.then(response => response.data)
}
const deletePerson = (person) => {
  const request=axios.delete(`${baseUrl}/${person.id}`)
  return request.then(response => response.data)
}

const changeNumber = (person, newNumber) => {
  console.log(person)
  const changedPerson = { ...person, number: newNumber }
  const request=axios.put(`${baseUrl}/${person.id}`, changedPerson)
  return request.then(response => response.data)
}
export default { getAll, create, deletePerson, changeNumber }