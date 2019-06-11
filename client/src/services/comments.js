import { api } from './apiHelper'
import LinkHeader from 'http-link-header'

const getPostComments = async (id, page) => {
  const endpoint = !!page ? `/posts/${id}/comments?page=${page}` : `/posts/${id}/comments`;
  const resp = await api(endpoint);
  if (!!resp.headers.link) {
    const links = LinkHeader.parse(resp.headers.link)
    return {
      comments: [...resp.data.data],
      links: {
        links: links.refs,
        total: parseInt(resp.headers.total),
        per_page: parseInt(resp.headers["per-page"])
      }
    }
  } else {
    return { comments: [...resp.data.data], links: null }
  }
}

const createComment = async (comment, postId) => {
  const resp = await api.post(`/posts/${postId}/comments`, comment)
  return resp.data.data
}

export {
  getPostComments,
  createComment,
}
