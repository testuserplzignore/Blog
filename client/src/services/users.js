import { api, updateToken } from './apiHelper'

const createUser = async (user) => {
  const resp = await api.post('/users', user)
  updateToken(resp.data.token)
  return resp.data.user
}

const loginUser = async (email, password) => {
  const resp = await api.post('/users/login', {
    email,
    password
  })
  updateToken(resp.data.token)
  return resp.data.user
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
      console.log(token);
      updateToken(token);
      return resp.data;
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
}
