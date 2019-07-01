import React, { useState, useEffect } from 'react'
import moment from 'moment'
import SlateEditor from './slate/SlateEditor'
import { Value } from 'slate'
import { getPostComments, createComment } from '../../services/comments'
import PostForm from './PostForm'
import {
  Header,
  Container,
  Comment,
  Divider,
  Pagination
} from 'semantic-ui-react'

const CommentIndex = props => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if (postId !== props.match.params.id) {
        try {
          const newComments = await getPostComments(props.match.params.id, page);
          setComments(newComments);
        } catch (error) {
          console.error(error);
          setIsError(true)
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page, postId, props.match.params.id])

  const handleSubmit = async (comment) => {
    const commentObj = {
      title: comment.title,
      content: JSON.stringify(comment.content.toJSON())
    }
    await createComment(commentObj, postId);
    const comments = await getPostComments(props.match.params.id);
    setComments(comments)
  }

  const onPageChange = async(e, data) => {
    setPage(data.activePage)
  }

  return(
    <Container>
    <Header style={{marginTop: '3em'}}>
      Comments ({!!comments.comments ? comments.comments.length : 0})
    </Header>
    <Divider />
    <Comment.Group>
      <PostForm
        handleSubmit={handleSubmit}
      />

      {comments.comments &&
        <>
          {comments.comments.map(comment => (
            <Container key={comment.id}>
            <Comment>
              <Comment.Content>
                <Comment.Author as='h4'>{comment.attributes.poster.username} commented {moment(comment.attributes.created_at).fromNow()}:</Comment.Author>
                <Comment.Text as='h5'>{comment.attributes.title}</Comment.Text>
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
      <Pagination
        style={{marginBottom: '2em'}}
        pointing
        disabled={!comments.links}
        secondary
        defaultActivePage={page}
        totalPages={!comments.links ? 0 : Math.ceil(comments.links.total/comments.links.per_page)}
        onPageChange={onPageChange}
      />
    </Comment.Group>
    </Container>
  )
}

export default CommentIndex
