import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  getPosts,
} from './services/posts'
import Main from './components/Main'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      posts: [],
    }
  }

  async componentDidMount() {
    const posts = await getPosts()

    this.setState({
      posts
    })
  }

  render() {
    const { state } = this
    const {
      posts
    } = state
    return (
      <div className="App">
        <Main
          posts = {posts}
        />
      </div>
    );
  }
}

export default App;
