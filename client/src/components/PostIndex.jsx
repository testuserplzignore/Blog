import React from 'react'
import {
  Button,
  Container,
  Item,
  Pagination,
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
    postOnPageChange,
  } = props
  return (
    <Container>
      { parseInt(user.id) === 1 && <PostForm
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
