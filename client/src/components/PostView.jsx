import React from 'react'
import CommentIndex from './CommentIndex'
import PostForm from './PostForm'
import SlateReadOnly from './slate/SlateReadOnly'

const PostView = props => {
  const {
    post,
    comments,
    postViewCheck,
    commentFormData,
    handleCommentFormChange,
    handleSlateCommentChange,
    commentHasMark,
    handleCommentFormCreate,
  } = props

  postViewCheck(post.id, props.match.params.id)
  return (
    <>
      <h2>{post.title}</h2>
      {post.content && <SlateReadOnly
        post={JSON.parse(post.content)}
      />}


      <PostForm
        formData={commentFormData}
        handleChange={handleCommentFormChange}
        handleSlateChange={handleSlateCommentChange}
        hasMark={commentHasMark}
        handleSubmit={handleCommentFormCreate}
      />
      <CommentIndex comments={comments} />
    </>
  )
}

export default PostView
