import React from 'react'
import '../style/form.css'

const UserForm = (props) => {
  const {
    userFormData,
    handleUserFormChange,
    handleUserFormCreate,
    handleUpdateUser,
    handleLogin,
  } = props

  return (
    <form className='userForm' onSubmit={handleUserFormCreate || handleLogin || handleUpdateUser}>
      {!handleLogin &&
        <input
        className='input'
        type='text'
        name='username'
        placeholder='Username'
        value={userFormData.username}
        onChange={handleUserFormChange}
      />}
      <input
        className='input'
        type='text'
        name='email'
        placeholder='Email'
        value={userFormData.email}
        onChange={handleUserFormChange}
      />
      <input
        className='input'
        type='password'
        name='password'
        placeholder='Password'
        value={userFormData.password}
        onChange={handleUserFormChange}
      />
      <input className='button green large' type='submit'/>
    </form>
  )
}

export default UserForm
