import React from 'react'
import {
  Button,
  Input,
  Form,
} from 'semantic-ui-react'


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
    <Form
      onSubmit={handleUserFormCreate || handleLogin || handleUpdateUser}
    >
      { !handleLogin &&
        <Form.Field>
          <Form.Input
            label='Username'
            type='text'
            name='username'
            placeholder='Username'
            value={userFormData.username}
            onChange={handleUserFormChange}
          />
        </Form.Field>
      }
      <Form.Field>
        <Form.Input
          label='Email'
          type='text'
          name='email'
          placeholder='Email'
          value={userFormData.email}
          onChange={handleUserFormChange}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label='Password'
          type='password'
          name='password'
          placeholder='Password'
          value={userFormData.password}
          onChange={handleUserFormChange}
        />
      </Form.Field>
      <Button disabled={!buttonActive} color='green' type='submit'>Submit</Button>
    </Form>
  )
}

export default UserForm
