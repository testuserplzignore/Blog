import { api } from './apiHelper'

const createUser = async (user) => {
  const resp = api.post('/users', user)
  return resp.data
}

export {
  createUser
}
