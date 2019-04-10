import { api } from './apiHelper'

const getPostComments = async (id) => {
  const resp = await api(`/posts/${id}/comments`)
  return resp.data
}

const createComment = async (comment, postId) => {
  const resp = await api.post(`/posts/${postId}/comments`, comment)
  return resp.data
}

export {
  getPostComments,
  createComment,
}
