import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  contentType: 'application/json',
  dataType: "json",
})

export {
  api
}
