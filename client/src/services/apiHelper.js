import axios from 'axios'

const api = axios.create({
  baseURL: 'https://boiling-tundra-50188.herokuapp.com',
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
