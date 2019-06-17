import React, { useState, useEffect } from 'react'
import SlateEditor from './slate/SlateEditor'
import { Value } from 'slate'
import { getPostComments } from '../services/comments'
import {
  Container,
  Comment,
  Divider,
} from 'semantic-ui-react'

const CommentIndex = props => {
  const { postId } = props;
  const [comments, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if (postId !== props.match.params.id) {
        try {
          const comments = await getPostComments(props.match.params.id);
          setPost(comments);
        } catch (error) {
          console.error(error);
          setIsError(true)
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return(
    <Comment.Group>

      {comments.comments &&
        <>
          {comments.comments.map(comment => (
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
    </Comment.Group>
  )
}

export default CommentIndex
