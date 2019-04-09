import { api } from './apiHelper'

const createUser = async (user) => {
  const resp = await api.post('/users', user)
  return resp.data
}

export {
  createUser
}
