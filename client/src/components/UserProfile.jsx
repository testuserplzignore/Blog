import React, { Component } from 'react';
import UserForm from './UserForm'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    this.state = {
      edit: false
    }
  }

  handleEdit(e){
    e.preventDefault()
    this.setState(prevState=>({
      edit: !prevState.edit
    }))
    this.props.handleEditSelect(this.state.edit)
  }

  async handleUpdate(e) {
    e.preventDefault()
    await this.props.handleUpdateUser()
    this.setState(prevState=>({
      edit: !prevState.edit
    }))
  }

  render() {
    const {
      state,
      props,
      handleEdit,
      handleUpdate,
    } = this
    const {
      edit,
    } = state
    const {
      userFormData,
      handleDeleteUser,
      handleUserFormChange,
    } = props
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
}

export default withRouter(UserProfile)
