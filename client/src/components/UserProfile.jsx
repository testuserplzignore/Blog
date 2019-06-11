import React, {
  useState,
} from 'react'
import {
  Button
} from 'semantic-ui-react'
import UserForm from './UserForm'

function UserProfile(props) {
  const [edit, setEdit] = useState(false)
  const {
    userFormData,
    handleDeleteUser,
    handleUserFormChange,
    handleUpdateUser,
    handleEditSelect
  } = props

  function handleEdit() {
    handleEditSelect()
    setEdit(!edit)
  }

  function handleUpdate() {
    handleUpdateUser();
    setEdit(!edit);
  }
  return(
    <>
      <div className='toolbar-group'>
        <Button color='red' onClick={handleDeleteUser}>
          Delete
        </Button>
      </div>
      <div className='toolbar-group'>
        <Button color='blue' onClick={handleEdit}>
          Edit
        </Button>
      </div>

      {edit &&
        <UserForm
          userFormData={userFormData}
          handleUpdateUser={handleUpdate}
          handleUserFormChange={handleUserFormChange}
        />
      }
    </>
  )
}

export default UserProfile
