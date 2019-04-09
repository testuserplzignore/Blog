import React from 'react'
import { withRouter } from 'react-router-dom'

import PostForm from './PostForm'

const PostIndex = props => {
  const {
    posts,
    postFormData,
    handlePostFormChange,
    handlePostFormCreate,
  } = props


  return (
    <>
      <PostForm
        postFormData={postFormData}
        handleChange={handlePostFormChange}
        handleSubmit={handlePostFormCreate}
      />
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <button onClick={()=>props.history.push(`/posts/${post.id}`)}>View Post</button>
        </div>
      ))}
    </>
  )
}

export default PostIndex
