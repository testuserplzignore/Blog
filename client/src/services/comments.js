import { api } from './apiHelper'

const getPostComments = async (id) => {
  const resp = await api(`/posts/${id}/comments`)
  return resp.data
}

export {
  getPostComments,
}
