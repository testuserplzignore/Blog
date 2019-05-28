import React from 'react'
import { withRouter } from 'react-router-dom'

const Header = props => {
  const {
    user,
    handleLogout,
  } = props
  return (
    <div className='navbar'>
      <button className='home' onClick={()=>props.history.push('/')}>Home</button>
      <div className='dropdown'>
        <button className='dropbtn'>User</button>
        <div className='dropdown-content'>
          {user.id ? (
            <>
              <button className='mediabtn' onClick={()=>props.history.push('/profile')}>profile</button>
              <button className='mediabtn' onClick={handleLogout}>Logout</button>
            </>
          ):(
            <>
              <button className='mediabtn' onClick={()=>props.history.push('/register')}>Register</button>
              <button className='mediabtn' onClick={()=>props.history.push('/login')}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
