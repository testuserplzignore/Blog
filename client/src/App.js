import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/header.css'
import './style/form.css'
import { withRouter } from 'react-router-dom'
import { initialValue } from './components/slate/slateHelpers'

import {
  getPosts,
  getPost,
  createPost,
} from './services/posts'

import {
  getPostComments,
  createComment,
} from './services/comments'

import {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
  verifyToken,
} from './services/users'

import Header from './components/Header'
import Main from './components/Main'

class App extends Component {
  constructor(props){
    super(props)

    this.postViewCheck = this.postViewCheck.bind(this)
    this.handlePostFormChange = this.handlePostFormChange.bind(this)
    this.handleSlatePostChange = this.handleSlatePostChange.bind(this)
    this.handlePostFormCreate = this.handlePostFormCreate.bind(this)

    this.handleUserFormChange = this.handleUserFormChange.bind(this)
    this.handleUserFormCreate = this.handleUserFormCreate.bind(this)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleEditSelect = this.handleEditSelect.bind(this)

    this.handleCommentFormChange = this.handleCommentFormChange.bind(this)
    this.handleSlateCommentChange = this.handleSlateCommentChange.bind(this)
    this.handleCommentFormCreate = this.handleCommentFormCreate.bind(this)

    this.state = {
      user: {},
      posts: [],
      post: {},
      comments: [],
      postFormData: {
        title: '',
        content: initialValue,
      },
      commentFormData: {
        title: '',
        content: initialValue,
      },
      userFormData: {
        username: '',
        email: '',
        password: '',
      },
    }
  }

  async componentDidMount() {
    const user = await verifyToken()
    const posts = await getPosts()
    this.setState({
      user,
      posts
    })
  }

  handleSlatePostChange({ value }) {
    const content = value
    this.setState(prevState => ({
      postFormData: {
        ...prevState.postFormData,
        content,
      }
    }))
  }

  handlePostFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState =>({
      postFormData: {
        ...prevState.postFormData,
        [name]: value
      }
    }));
  }

  async handlePostFormCreate(e){
    e.preventDefault()
    const { postFormData } = this.state
    const post = await createPost(postFormData)
    const posts = await getPosts()

    this.setState({
      posts,
      postFormData: {
        title: '',
        content: '',
      },
    })
  }

  handleCommentFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState =>({
      commentFormData: {
        ...prevState.commentFormData,
        [name]: value
      }
    }));
  }

  handleSlateCommentChange({ value }) {
    const content = value
    this.setState(prevState => ({
      commentFormData: {
        ...prevState.commentFormData,
        content,
      }
    }))
  }

  async handleCommentFormCreate(e){
    e.preventDefault()
    const { commentFormData, post } = this.state
    console.log(commentFormData);
    const comment = await createComment(commentFormData, post.id)
    const comments = await getPostComments(post.id)

    this.setState({
      comments,
      commentFormData: {
        title: '',
        content: '',
      },
    })
  }

  handleUserFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState =>({
      userFormData: {
        ...prevState.userFormData,
        [name]: value
      }
    }));
  }

  async handleUserFormCreate(e){
    e.preventDefault()
    const { userFormData } = this.state
    const user = await createUser(userFormData)
    console.log(user);
    this.setState({
      user,
      userFormData: {
        username: '',
        email: '',
        password: '',
      },
    })
    this.props.history.push('/')
  }

  async handleLogin(e){
    e.preventDefault()
    const { email, password } = this.state.userFormData
    const user = await loginUser(email, password)
    this.setState({
      user,
      userFormData: {
        username: '',
        email: '',
        password: '',
      },
    })
    this.props.history.push('/')
  }

  async handleLogout(e){
    e.preventDefault()
    localStorage.removeItem('authToken')
    await verifyToken()
    this.setState({
      user: {},
    })
   this.props.history.push('/');
  }

  async handleEditSelect(edit){
    const { user } = this.state
    if (!edit) {
      this.setState({
        userFormData: {
          username: user.username,
          email: user.email,
          password: '',
        }
      })
    } else {
      this.setState({
        userFormData: {
          username: '',
          email: '',
          password: '',
        }
      })
    }
  }

  async handleUpdateUser(){
    const { user, userFormData } = this.state
    const updatedUser = await updateUser(user.id, userFormData)
    this.setState({
      user: updatedUser,
      userFormData: {
        username: '',
        email: '',
        password: '',
      }
    })
  }

  async handleDeleteUser(e){
    e.preventDefault()
    localStorage.removeItem('authToken')
    const { id } = this.state.user
    await deleteUser(id)
    this.setState({
      user: {},
    })
    this.props.history.push('/')
  }

  async postViewCheck(bandId, propId) {
    if (bandId != propId){
      const post = await getPost(parseInt(propId))
      const comments = await getPostComments(parseInt(propId))
      this.setState({
        post,
        comments,
      })
    }
  }

  render() {
    const {
      state,

      postViewCheck,
      handlePostFormChange,
      handleSlatePostChange,
      handlePostFormCreate,

      handleUserFormChange,
      handleUserFormCreate,
      handleLogin,
      handleLogout,
      handleEditSelect,
      handleUpdateUser,
      handleDeleteUser,

      handleCommentFormChange,
      handleSlateCommentChange,
      handleCommentFormCreate,
    } = this

    const {
      user,
      userFormData,

      posts,
      postFormData,

      post,
      comments,
      commentFormData,
    } = state
    console.log(state);
    return (
      <div className="App">
        <Header
          user={user}
          handleUserFormChange={handleUserFormChange}
          handleLogout={handleLogout}
        />

        <Main
          user={user}
          posts={posts}
          postFormData={postFormData}
          handlePostFormChange={handlePostFormChange}
          handleSlatePostChange={handleSlatePostChange}
          handlePostFormCreate={handlePostFormCreate}

          userFormData={userFormData}
          handleUserFormChange={handleUserFormChange}
          handleUserFormCreate={handleUserFormCreate}
          handleLogin={handleLogin}
          handleEditSelect={handleEditSelect}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}

          post={post}
          comments={comments}
          postViewCheck={postViewCheck}
          commentFormData={commentFormData}
          handleCommentFormChange={handleCommentFormChange}
          handleSlateCommentChange={handleSlateCommentChange}
          handleCommentFormCreate={handleCommentFormCreate}
        />
      </div>
    );
  }
}

export default withRouter(App);
