import React from 'react'
import { Route } from 'react-router-dom'
import {
  Container
} from 'semantic-ui-react'

import PostIndex from './PostIndex'
import PostView from './PostView'
import UserForm from './UserForm'
import UserProfile from './UserProfile'
import HireMe from './HireMe/HireMe'
import ContactMe from './ContactMe'

function Main(props) {
  const {
    user,
    handleLogin,
    handleUpdate,
    handleRegister,
  } = props
  return(
    <Container text className='main'>
      <Route exact path='/' render={props => (
        <PostIndex
          {...props}
          user={user}
        />
      )} />
      <Route exact path='/HireMe' render={props => (
        <HireMe
          {...props}
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
      <Route path='/profile' render={props => (
        user && <UserProfile
          {...props}
          user={user}
          handleUpdate={handleUpdate}
        />
      )} />

      <ContactMe />

    </Container>
  )
}

export default Main
