import React from 'react'
import { withRouter } from 'react-router-dom'

import PostForm from './PostForm'

const PostIndex = props => {
  const {
    user,
    posts,
    postFormData,
    handlePostFormChange,
    handleSlatePostChange,
    postHasMark,
    handlePostFormCreate,
  } = props


  return (
    <>
      {user.id == 1 && <PostForm
        formData={postFormData}
        handleChange={handlePostFormChange}
        handleSlateChange={handleSlatePostChange}
        hasMark={postHasMark}
        handleSubmit={handlePostFormCreate}
      />}
      {posts.map(post => (
        <div className='form' key={post.id}>
          <h1 className='title'>{post.title}</h1>
          <h3 className='title'>{post.user.username}</h3>
          <button onClick={()=>props.history.push(`/posts/${post.id}`)}>View Post</button>
        </div>
      ))}
    </>
  )
}

export default PostIndex
