import React from 'react'
import CommentIndex from './CommentIndex'

const PostView = props => {
  const {
    post,
    comments,
    postViewCheck,
  } = props

  postViewCheck(post.id, props.match.params.id)
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <CommentIndex comments={comments} />
    </>
  )
}

export default PostView
