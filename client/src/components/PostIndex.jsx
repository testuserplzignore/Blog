import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Item,
  Pagination,
 } from 'semantic-ui-react'
 import {
   getPosts,
 } from '../services/posts'

import PostForm from './PostForm'

function PostIndex(props) {
  const { user, postFormData, handleSlatePostChange,
    handlePostFormChange, postHasMark, postHasBlock, handlePostFormCreate, postOnPageChange } = props;

  const [posts, setPosts] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  },[])

  console.log(posts);
  return (
    <Container>
      { user && parseInt(user.id) === 1 && <PostForm
        formData={postFormData}
        handleChange={handlePostFormChange}
        handleSlateChange={handleSlatePostChange}
        hasMark={postHasMark}
        hasBlock={postHasBlock}
        handleSubmit={handlePostFormCreate}
      /> }
      <Item.Group divided>
        { !!posts.posts && posts.posts.map( post => (
          <Item key={post.attributes.id}>
            <Item.Content>
              <Item.Header as='h1'>{post.attributes.title}</Item.Header>
              <Item.Meta as='h3'>{post.attributes.poster.username}</Item.Meta>
              <Button color='blue' onClick={()=>props.history.push(`/posts/${post.id}`)}>View Post</Button>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      { !!posts.links && <Pagination
        pointing
        secondary
        defaultActivePage={1}
        totalPages={Math.ceil(posts.links.total/posts.links.per_page)}
        onPageChange={postOnPageChange}
      /> }
    </Container>
  )
}

export default PostIndex
