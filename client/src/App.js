import React, { Component } from 'react';
import './App.css';
import './style/header.css'
import './style/plasticButtons.css'
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
    this.postHasMark = this.postHasMark.bind(this)
    this.postHasBlock = this.postHasBlock.bind(this)
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
    this.commentHasMark = this.commentHasMark.bind(this)
    this.commentHasBlock = this.commentHasBlock.bind(this)
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

  postHasMark(type) {
    const { postFormData: { content } } = this.state
    return content.activeMarks.some(mark => mark.type === type)
  }

  postHasBlock(type) {
    const { postFormData: { content } } = this.state
    return content.blocks.some(node => node.type === type)
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
    const postObj = {
      title: postFormData.title,
      content: JSON.stringify(postFormData.content.toJSON())
    }
    await createPost(postObj)
    const posts = await getPosts()

    this.setState({
      posts,
      postFormData: {
        title: '',
        content: initialValue,
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

  commentHasMark(type) {
    const { commentFormData: { content } } = this.state
    return content.activeMarks.some(mark => mark.type === type)
  }

  commentHasBlock(type) {
    const { commentFormData: { content } } = this.state
    return content.blocks.some(node => node.type === type)
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
    const commentObj = {
      title: commentFormData.title,
      content: JSON.stringify(commentFormData.content.toJSON())
    }
    await createComment(commentObj, post.id)
    const comments = await getPostComments(post.id)
    this.setState({
      comments,
      commentFormData: {
        title: '',
        content: initialValue,
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

  async postViewCheck(postId, propId) {
    if (postId !== parseInt(propId)){
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
      postHasMark,
      postHasBlock,
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
      commentHasMark,
      commentHasBlock,
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
          postHasMark={postHasMark}
          postHasBlock={postHasBlock}
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
          commentHasMark={commentHasMark}
          commentHasBlock={commentHasBlock}
          handleCommentFormCreate={handleCommentFormCreate}
        />
      </div>
    );
  }
}

export default withRouter(App);
