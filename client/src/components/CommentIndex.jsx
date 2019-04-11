import React from 'react'
import SlateReadOnly from './slate/SlateReadOnly'

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
            {comment.content && <SlateReadOnly
              post={JSON.parse(comment.content)}
            />}
          </div>
        ))}
      </>
    }
    </>
  )
}

export default CommentIndex
