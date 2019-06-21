import React from 'react'
import { withRouter } from 'react-router-dom'

import {
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const NavBar = props => {
  const {
    user,
    handleLogout
  } = props

  return (
    <Menu size='massive'>
      <Menu.Item as='a' onClick={(e)=>{e.preventDefault(); props.history.push('/')}}>Home</Menu.Item>
      <Menu.Item as='a' onClick={(e)=>{e.preventDefault(); props.history.push('/blog')}}>My Blog</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown simple item text='User'>
          <Dropdown.Menu direction='right'>
            { user && user.id ? (
              <>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/blog/profile')}>profile</Dropdown.Item>
                <Dropdown.Item as='a' onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            ):(
              <>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/blog/register')}>Register</Dropdown.Item>
                <Dropdown.Item as='a' onClick={()=>props.history.push('/blog/login')}>Login</Dropdown.Item>
              </>
            ) }
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default withRouter(NavBar)
