import { api, updateToken } from './apiHelper'

const createUser = async (user) => {
  const resp = await api.post('/users', {user: user})
  updateToken(resp.data.data.attributes.token)
  return resp.data.data
}

const loginUser = async (email, password) => {
  const resp = await api.post('/users/login', {
    email,
    password
  })
  updateToken(resp.data.data.attributes.token)
  return resp.data.data
}

const updateUser = async (id, data) => {
  const resp = await api.put(`/users/${id}`, data)
  updateToken(resp.data.data.attributes.token)
  return resp.data.data
}

const deleteUser = async (id) => {
  const resp = await api.delete(`/users/${id}`)
  return resp.data.data
}

const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token === null) {
    return false;
  } else {

    try {
      const resp = await api.get('/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      updateToken(token);
      return resp.data.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export {
  createUser,
  verifyToken,
  loginUser,
  updateUser,
  deleteUser,
}
