import React, { Component } from 'react';
import UserForm from './UserForm'
import { withRouter } from 'react-router-dom'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)

    this.state = {
      edit: false
    }
  }

  handleEdit(e){
    e.preventDefault()
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
    } = this
    const {
      edit,
    } = state
    const {
      handleDeleteUser
    } = props
    return(
      <>
      <button onClick={handleDeleteUser}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </>
    )
  }
}

export default withRouter(UserProfile)
