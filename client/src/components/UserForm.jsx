import React, { useState } from 'react'

import {
  Button,
  Form,
} from 'semantic-ui-react'

import { createUser } from '../services/users'


const UserForm = (props) => {
  const {
    handleUpdateUser,
    handleLogin,
  } = props

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const resp = createUser({
        email,
        username,
        password
      })
    } catch (error) {
      console.log(error);
    }

  }

  const buttonActive = !!handleLogin ? (
    email.length > 0 && password.length > 0
  ) : (
    username.length > 0 && email.length > 0 && password.length > 0
  );
  return (
    <Form
      onSubmit={handleRegister || handleLogin || handleUpdateUser}
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
