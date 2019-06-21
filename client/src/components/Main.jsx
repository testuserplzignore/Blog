import React from 'react'
import { Route } from 'react-router-dom'
import {
  Container
} from 'semantic-ui-react'

import Blog from './Blog/Blog'
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
      <Blog
        {...props}
        user={user}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
        handleUpdate={handleUpdate}
      />
      <Route exact path='/' render={props => (
        <HireMe
          {...props}
        />
      )} />

      <ContactMe />

    </Container>
  )
}

export default Main
