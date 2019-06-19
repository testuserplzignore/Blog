import React from 'react'
import ProfileItem from './ProfileItem'
import { Container } from 'semantic-ui-react'

function UserProfile(props) {
  const { user, handleUpdate } = props;

  return (
    <div>
      <ProfileItem
        label='Username'
        field='username'
        item={user.username}
        handleUpdate={handleUpdate}
      />
      <ProfileItem
        label='Email Address'
        field='username'
        item={user.email}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default UserProfile
