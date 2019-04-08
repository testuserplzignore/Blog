import React from 'react'

import PostIndex from './PostIndex'

const Main = props => {
  const {
    posts
  } = props

  return(
    <PostIndex posts={posts} />
  )
}

export default Main
