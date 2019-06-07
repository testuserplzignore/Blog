import React from 'react'
import SlateEditor from './slate/SlateEditor'
import {
  Container,
  Comment,
  Header,
  Divider,
} from 'semantic-ui-react'

const CommentIndex = props => {
  const {
    comments
  } = props

  return(
    <Container>
    {comments &&
      <>
        {comments.map(comment => (
          <>
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Text as='h4'>{comment.title}</Comment.Text>
              <Comment.Author as='h5'>{comment.user.username}</Comment.Author>
              {comment.content && <SlateEditor
                isReadOnly={true}
                value={JSON.parse(comment.content)}
              />}
            </Comment.Content>
          </Comment>
          <Divider />
          </>
        ))}
      </>
    }
    </Container>
  )
}

export default CommentIndex
