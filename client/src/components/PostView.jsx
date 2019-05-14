import React from 'react'
import CommentIndex from './CommentIndex'
import PostForm from './PostForm'
import SlateReadOnly from './slate/SlateReadOnly'

const PostView = (props) => {
  const {
    post,
    comments,
    postViewCheck,
    commentFormData,
    handleCommentFormChange,
    handleSlateCommentChange,
    commentHasMark,
    commentHasBlock,
    handleCommentFormCreate,
  } = props

  postViewCheck(post.id, props.match.params.id)
  return (
    <>
      <h1 className='title'>{post.title}</h1>
      {post.content && <SlateReadOnly
        post={JSON.parse(post.content)}
      />}


      <PostForm
        formData={commentFormData}
        handleChange={handleCommentFormChange}
        handleSlateChange={handleSlateCommentChange}
        hasMark={commentHasMark}
        hasBlock={commentHasBlock}
        handleSubmit={handleCommentFormCreate}
      />
      <CommentIndex comments={comments} />
    </>
  )
}

export default PostView
