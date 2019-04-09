import React from 'react'
import UserForm from './UserForm'

const Header = props => {
  const {
    userFormData,
    handleUserFormChange,
    handleLogin
  } = props
  return (
    <>
      <h1>dicks</h1>
      <UserForm
        userFormData={userFormData}
        handleUserFormChange={handleUserFormChange}
        handleLogin={handleLogin}
      />
    </>
  )
}

export default Header
