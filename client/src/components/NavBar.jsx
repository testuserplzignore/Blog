import React from 'react'
import { withRouter } from 'react-router-dom'

import {
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const NavBar = props => {
  const {
    user,
  } = props

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('authToken')
    props.history.push('/');
  }

  return (
    <Menu size='massive'>
      <Menu.Item as='a' onClick={()=>props.history.push('/')}>Home</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown simple item text='User'>
          <Dropdown.Menu direction='right'>
            { user && user.id ? (
              <>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/profile')}>profile</Dropdown.Item>
                <Dropdown.Item as='a' onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            ):(
              <>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/register')}>Register</Dropdown.Item>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/login')}>Login</Dropdown.Item>
              </>
            ) }
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default withRouter(NavBar)
