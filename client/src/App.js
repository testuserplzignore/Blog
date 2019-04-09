import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom'

import {
  getPosts,
  getPost,
  createPost,
} from './services/posts'

import {
  getPostComments,
} from './services/comments'

import {
  createUser
} from './services/users'

import Main from './components/Main'

class App extends Component {
  constructor(props){
    super(props)

    this.postViewCheck = this.postViewCheck.bind(this)
    this.handlePostFormChange = this.handlePostFormChange.bind(this)
    this.handlePostFormCreate = this.handlePostFormCreate.bind(this)

    this.handleUserFormChange = this.handleUserFormChange.bind(this)
    this.handleUserFormCreate = this.handleUserFormCreate.bind(this)

    this.state = {
      posts: [],
      post: {},
      comments: [],
      postFormData: {
        title: '',
        content: '',
      },
      commentFormData: {
        title: '',
        content: '',
      },
      userFormData: {
        username: '',
        email: '',
        password: '',
      },
    }
  }

  async componentDidMount() {
    const posts = await getPosts()

    this.setState({
      posts
    })
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

  handleUserFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState =>({
      userFormData: {
        ...prevState.userFormData,
        [name]: value
      }
    }));
  }

  async handlePostFormCreate(e){
    e.preventDefault()
    const { postFormData } = this.state
    const postData = {
      ...postFormData,
      user_id:1,
    }
    const post = await createPost(postData)
    const posts = await getPosts()

    this.setState({
      posts,
      postFormData: {
        title: '',
        content: '',
      },
    })
  }

  async handleUserFormCreate(e){
    e.preventDefault()
    console.log('hey');
    const { userFormData } = this.state
    const user = await createUser(userFormData)
    console.log(user);
    this.setState({
      userFormData: {
        username: '',
        email: '',
        password: '',
      },
    })
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
      handlePostFormCreate,
      handleUserFormChange,
      handleUserFormCreate,
    } = this
    const {
      userFormData,

      posts,
      postFormData,

      post,
      comments,
    } = state
    return (
      <div className="App">
        <Main
          posts={posts}
          postFormData={postFormData}
          handlePostFormChange={handlePostFormChange}
          handlePostFormCreate={handlePostFormCreate}

          userFormData={userFormData}
          handleUserFormChange={handleUserFormChange}
          handleUserFormCreate={handleUserFormCreate}

          post={post}
          comments={comments}
          postViewCheck={postViewCheck}
        />
      </div>
    );
  }
}

export default withRouter(App);
