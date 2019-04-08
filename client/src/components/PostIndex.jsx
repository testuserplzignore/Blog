import React from 'react'

const PostIndex = props => {
  const {
    posts,
  } = props

  return (
    <>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  )
}

export default PostIndex
