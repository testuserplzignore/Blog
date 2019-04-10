import React, { Component } from 'react';
import UserForm from './UserForm'
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
    console.log(this.state);
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
      user,
      userFormData,
      handleDeleteUser,
      handleUserFormChange,
    } = props
    return(
      <>
        <button onClick={handleDeleteUser}>Delete</button>
        <button onClick={handleEdit}>Edit</button>

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
