import { api } from './apiHelper'

const getPosts = async () => {
  const resp = await api('/posts')
  return resp.data
}

export {
  getPosts,

}
