import React, { useState, useEffect } from 'react'
import SlateEditor from './slate/SlateEditor'
import { Value } from 'slate'
import {
  Button,
  Container,
  Item,
  Pagination,
 } from 'semantic-ui-react'
 import {
   getPosts,
   createPost,
 } from '../../services/posts'

import PostForm from './PostForm'

function PostIndex(props) {
  const { user } = props;

  const [posts, setPosts] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (post) => {
    const postObj = {
      title: post.title,
      content: JSON.stringify(post.content.toJSON())
    }
    await createPost(postObj);
    const posts = await getPosts(page);
    console.log(posts);
    setPosts(posts)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const posts = await getPosts(page);
        setPosts(posts);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [page])

  const onPageChange = (e, data) => {
    setPage(data.activePage)
  }

  return (
    <Container>
      { user && parseInt(user.id) === 1 && <PostForm
        handleSubmit={handleSubmit}
      /> }
      <Item.Group divided>
        { !!posts.posts && posts.posts.map( post => (
          <Item key={post.attributes.id}>
            <Item.Content>
              <Item.Header as='h1'>{post.attributes.title}</Item.Header>
              <Item.Meta as='h3'>{post.attributes.poster.username}</Item.Meta>
              <Item.Description
                className='index'
              >
                <SlateEditor
                  isReadOnly={true}
                  value={Value.fromJSON(JSON.parse(post.attributes.content))}
                />
              </Item.Description>
              <Button color='blue' onClick={()=>props.history.push(`/blog/posts/${post.id}`)}>View Post</Button>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <Pagination
        pointing
        disabled={!posts.links}
        secondary
        defaultActivePage={1}
        totalPages={!posts.links ? 0 : Math.ceil(posts.links.total/posts.links.per_page)}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default PostIndex
