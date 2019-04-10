import React from 'react'

const UserForm = (props) => {
  const {
    userFormData,
    handleUserFormChange,
    handleUserFormCreate,
    handleUpdateUser,
    handleLogin,
  } = props

  return (
    <form onSubmit={handleUserFormCreate || handleLogin || handleUpdateUser}>
      {!handleLogin &&
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={userFormData.username}
        onChange={handleUserFormChange}
      />}
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={userFormData.email}
        onChange={handleUserFormChange}
      />
      <input
        type='text'
        name='password'
        placeholder='Password'
        value={userFormData.password}
        onChange={handleUserFormChange}
      />
      <input type='submit'/>
    </form>
  )
}

export default UserForm
