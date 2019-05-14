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
          <div key={comment.id} className='comment'>
            <h4 className='title'>{comment.title}</h4>
            <h5 className='title'>{comment.user.username}</h5>
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
