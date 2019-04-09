import { api } from './apiHelper'

const getPosts = async () => {
  const resp = await api('/posts')
  return resp.data
}

const getPost = async (id) => {
  const resp = await api(`/posts/${id}`)
  return resp.data
}

const createPost = async (post) => {
  const resp = await api.post('/posts', post)
  return resp.data
}

export {
  getPosts,
  getPost,
  createPost,
}
