import React from 'react'
import { Route } from 'react-router-dom'

import PostIndex from './PostIndex'
import PostView from './PostView'
import UserForm from './UserForm'

const Main = props => {
  const {
    userFormData,
    handleUserFormChange,
    handleUserFormCreate,

    posts,
    postFormData,
    handlePostFormChange,
    handlePostFormCreate,

    post,
    comments,
    postViewCheck,
  } = props

  return(
    <>
      <Route exact path='/' render={props => (
        <PostIndex
          {...props}
          posts={posts}
          postFormData={postFormData}
          handlePostFormChange={handlePostFormChange}
          handlePostFormCreate={handlePostFormCreate}
        />
      )} />

      <Route path='/register' render={props => (
        <UserForm
          {...props}
          userFormData={userFormData}
          handleUserFormChange={handleUserFormChange}
          handleUserFormCreate={handleUserFormCreate}

        />
      )} />

      <Route path='/posts/:id' render={props => (
        <PostView {...props}
          post={post}
          comments={comments}
          postViewCheck={postViewCheck}
        />
      )} />
    </>
  )
}

export default Main
