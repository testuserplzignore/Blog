import axios from 'axios'

const BASE_URL = 'https://boiling-tundra-50188.herokuapp.com'
//const BASE_URL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: BASE_URL,
  contentType: 'application/json',
  dataType: "json",
})

const updateToken = token => {
  localStorage.setItem('authToken', token)
  api.defaults.headers.common.authorization = `Bearer ${token}`
}

export {
  api,
  updateToken,
}
