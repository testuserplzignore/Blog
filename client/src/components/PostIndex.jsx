import React from 'react'
import {
  Button,
  Container,
  Item,
 } from 'semantic-ui-react'

import PostForm from './PostForm'

const PostIndex = props => {
  const {
    user,
    posts,
    postFormData,
    handlePostFormChange,
    handleSlatePostChange,
    postHasMark,
    postHasBlock,
    handlePostFormCreate,
  } = props


  return (
    <Container>
      { user.id === 1 && <PostForm
        formData={postFormData}
        handleChange={handlePostFormChange}
        handleSlateChange={handleSlatePostChange}
        hasMark={postHasMark}
        hasBlock={postHasBlock}
        handleSubmit={handlePostFormCreate}
      /> }
      <Item.Group divided>
        { posts.map( post => (
          <Item key={post.id}>
            <Item.Content>
              <Item.Header as='h1'>{post.title}</Item.Header>
              <Item.Meta as='h3'>{post.user.username}</Item.Meta>
              <Button color='blue' onClick={()=>props.history.push(`/posts/${post.id}`)}>View Post</Button>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Container>
  )
}

export default PostIndex
