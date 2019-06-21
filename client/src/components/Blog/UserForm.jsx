import React, { useState } from 'react'

import {
  Button,
  Form,
} from 'semantic-ui-react'


const UserForm = (props) => {
  const {
    handleRegister,
    handleUpdateUser,
    handleLogin,
  } = props

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submit = handleRegister || handleLogin || handleUpdateUser;
    const user = {
      email,
      username,
      password,
    }
    submit(user)
  }

  const buttonActive = !!handleLogin ? (
    email.length > 0 && password.length > 0
  ) : (
    username.length > 0 && email.length > 0 && password.length > 0
  );
  return (
    <Form
      onSubmit={handleSubmit}
    >
      { !handleLogin &&
        <Form.Field>
          <Form.Input
            label='Username'
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Field>
      }
      <Form.Field>
        <Form.Input
          label='Email'
          type='text'
          name='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label='Password'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Field>
      <Button disabled={!buttonActive} color='green' type='submit'>Submit</Button>
    </Form>
  )
}

export default UserForm
