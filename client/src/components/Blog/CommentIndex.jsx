import React, { useState, useEffect } from 'react'
import SlateEditor from './slate/SlateEditor'
import { Value } from 'slate'
import { getPostComments, createComment } from '../../services/comments'
import PostForm from './PostForm'
import {
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
    <Comment.Group>
      <PostForm
        handleSubmit={handleSubmit}
      />
      <Pagination
        pointing
        disabled={!comments.links}
        secondary
        defaultActivePage={page}
        totalPages={!comments.links ? 0 : Math.ceil(comments.links.total/comments.links.per_page)}
        onPageChange={onPageChange}
      />

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
