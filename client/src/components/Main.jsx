import React from 'react'
import { Route } from 'react-router-dom'
import {
  Container
} from 'semantic-ui-react'

import PostIndex from './PostIndex'
import UserForm from './UserForm'

function Main(props) {
  const {
    user,
    userFormData,
    handleUserFormChange,
    handleUserFormCreate,
    handleLogin,
    handleEditSelect,
    handleUpdateUser,
    handleDeleteUser,
    handleRegister,

    posts,
    postFormData,
    handlePostFormChange,
    handleSlatePostChange,
    postHasMark,
    postHasBlock,
    handlePostFormCreate,

    post,
    comments,
    commentFormData,
    handleCommentFormChange,
    handleSlateCommentChange,
    commentHasMark,
    commentHasBlock,
    handleCommentFormCreate,
    postViewCheck,

    postOnPageChange,
    commentOnPageChange,
  } = props
  return(
    <Container className='main'>
      <Route exact path='/' render={props => (
        <PostIndex
          {...props}
          user={user}
        />
      )} />
      <Route path='/register' render={props => (
        <UserForm
          {...props}
          handleRegister={handleRegister}
        />
      )} />
    </Container>
  )
}

export default Main
