import React, { useState, useEffect } from 'react'
import { Value } from 'slate'
import {
  Container,
  Header,
} from 'semantic-ui-react'
import CommentIndex from './CommentIndex'
import SlateEditor from './slate/SlateEditor'
import { getPost } from '../../services/posts'

function PostView(props) {
  const { id } = props.match.params;
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if (post.id !== id) {
        try {
          const post = await getPost(id);
          console.log(post);
          setPost(post);
        } catch (error) {
          console.log(error);
          setIsError(true)
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [post.id, id])

  return (
    <Container>
      { !!post.id && <>
        <Header as='h1'>{post.attributes.title}</Header>
        <SlateEditor
          isReadOnly={true}
          value={Value.fromJSON(JSON.parse(post.attributes.content))}
        />
      </> }

      < CommentIndex
        {...props}
        postId={post.id}
      />

    </Container>
  )
}

export default PostView