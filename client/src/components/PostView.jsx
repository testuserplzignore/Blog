import React, { useState, useEffect } from 'react'
import { Value } from 'slate'
import {
  Container,
  Comment,
  Header,
  Pagination
} from 'semantic-ui-react'
import CommentIndex from './CommentIndex'
import PostForm from './PostForm'
import SlateEditor from './slate/SlateEditor'
import { getPost } from '../services/posts'

const PostView = (props) => {
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(props);
      setIsError(false);
      setIsLoading(true);
      if (post.id !== props.match.params.id) {
        try {
          const post = await getPost(props.match.params.id);
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
  }, [])

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
