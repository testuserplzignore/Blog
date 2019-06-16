import React from 'react'
import { Route } from 'react-router-dom'
import {
  Container
} from 'semantic-ui-react'

import PostIndex from './PostIndex'
import PostView from './PostView'
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

      <Route path='/posts/:id' render={props => (
        <PostView {...props}
        />
      )} />

      <Route path='/register' render={props => (
        <UserForm
          {...props}
          handleRegister={handleRegister}
        />
      )} />

      <Route path='/login' render={props => (
        <UserForm
          {...props}
          handleLogin={handleLogin}
        />
      )} />

    </Container>
  )
}

export default Main
