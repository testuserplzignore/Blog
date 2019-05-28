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

  const buttonActive = !!handleLogin ? (
    userFormData.email.length > 0 && userFormData.password.length > 0
  ) : (
    userFormData.username.length > 0 && userFormData.email.length > 0 && userFormData.password.length > 0
  );
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
        />
      }
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
      <input disabled={!buttonActive} className='button green large' type='submit'/>
    </form>
  )
}

export default UserForm
