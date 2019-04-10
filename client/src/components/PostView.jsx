import React from 'react'
import CommentIndex from './CommentIndex'
import PostForm from './PostForm'

const PostView = props => {
  const {
    post,
    comments,
    postViewCheck,
    commentFormData,
    handleCommentFormChange,
    handleCommentFormCreate,
  } = props

  postViewCheck(post.id, props.match.params.id)
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <PostForm
      postFormData={commentFormData}
      handleChange={handleCommentFormChange}
      handleSubmit={handleCommentFormCreate}
      />
      <CommentIndex comments={comments} />
    </>
  )
}

export default PostView
