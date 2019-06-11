import { api } from './apiHelper'
import LinkHeader from 'http-link-header'

const getPosts = async (page) => {
  const endpoint = !!page ? `/posts?page=${page}` : '/posts'
  const resp = await api(endpoint)
  if (!!resp.headers.link) {
    const links = LinkHeader.parse(resp.headers.link)
    return {
      posts: [...resp.data.data],
      links: {
        links: links.refs,
        total: parseInt(resp.headers.total),
        per_page: parseInt(resp.headers["per-page"])
      }
    }
  } else {
    return {posts: [...resp.data.data], links: null }
  }

}

const getPost = async (id) => {
  const resp = await api(`/posts/${id}`)
  return resp.data.data
}

const createPost = async (post) => {
  const resp = await api.post('/posts', post)
  return resp.data.data
}

export {
  getPosts,
  getPost,
  createPost,
}
