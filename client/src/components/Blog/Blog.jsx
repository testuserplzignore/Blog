import React from 'react'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'

import PostIndex from './PostIndex'
import PostView from './PostView'
import UserForm from './UserForm'
import UserProfile from './UserProfile'

function Blog(props) {
  const {
    user,
    handleRegister,
    handleLogin,
    handleUpdate,
  } = props;

  return(
    <>
      <Route exact path='/Blog' render={props => (
        <PostIndex
          {...props}
          user={user}
        />
      )} />

      <Route path='/Blog/posts/:id' render={props => (
        <PostView {...props}
        />
      )} />

      <Route path='/Blog/register' render={props => (
        <UserForm
          {...props}
          handleRegister={handleRegister}
        />
      )} />

      <Route path='/Blog/login' render={props => (
        <UserForm
          {...props}
          handleLogin={handleLogin}
        />
      )} />
      <Route path='/Blog/profile' render={props => (
        user && <UserProfile
          {...props}
          user={user}
          handleUpdate={handleUpdate}
        />
      )} />

    </>
  )
}

export default Blog
