import React from 'react'

const CommentIndex = props => {
  const {
    comments
  } = props

  return(
    <>
    {comments &&
      <>
        {comments.map(comment => (
          <div key={comment.id}>
            <h4>{comment.title}</h4>
            <h5>{comment.user.username}</h5>
            <p>{comment.content}</p>
          </div>
        ))}
      </>
    }
    </>
  )
}

export default CommentIndex
