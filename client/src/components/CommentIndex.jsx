import React from 'react'
import SlateEditor from './slate/SlateEditor'
import { Value } from 'slate'
import {
  Container,
  Comment,
  Divider,
} from 'semantic-ui-react'

const CommentIndex = props => {
  const {
    comments
  } = props
  console.log(comments);
  return(
    <Container>
    {comments &&
      <>
        {comments.map(comment => (
          <Container key={comment.id}>
          <Comment>
            <Comment.Content>
              <Comment.Text as='h4'>{comment.attributes.title}</Comment.Text>
              <Comment.Author as='h5'>{comment.attributes.poster.username}</Comment.Author>
              {comment.attributes.content && <SlateEditor
                isReadOnly={true}
                value={Value.fromJSON(JSON.parse(comment.attributes.content))}
              />}
            </Comment.Content>
          </Comment>
          <Divider />
          </Container>
        ))}
      </>
    }
    </Container>
  )
}

export default CommentIndex
