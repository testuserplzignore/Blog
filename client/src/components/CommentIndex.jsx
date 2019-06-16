import React from 'react'
import { Value } from 'slate'
import {
  Container,
  Comment,
  Header,
  Pagination
} from 'semantic-ui-react'
import CommentIndex from './CommentIndex'
import PostForm from './PostForm'
import SlateEditor from './slate/SlateEditor'

const PostView = (props) => {
  const {
    post,
    comments,
    postViewCheck,
    commentFormData,
    handleCommentFormChange,
    handleSlateCommentChange,
    commentHasMark,
    commentHasBlock,
    handleCommentFormCreate,
    commentOnPageChange,
  } = props

  postViewCheck(post.id, props.match.params.id)
  return (
    <Container>
      { !!post.attributes && <>
        <Header as='h1'>{post.attributes.title}</Header>
        <SlateEditor
          isReadOnly={true}
          value={Value.fromJSON(JSON.parse(post.attributes.content))}
        />
      </> }
      <Header as='h3' dividing>
        Comments
      </Header>
      { !!comments.links && <Pagination
        pointing
        secondary
        defaultActivePage={1}
        totalPages={Math.ceil(comments.links.total/comments.links.per_page)}
        onPageChange={commentOnPageChange}
      /> }
      <Comment.Group>
        <CommentIndex
          comments={comments}
        />

        <PostForm
          handleSubmit={handleCommentFormCreate}
        />
      </Comment.Group>
    </Container>
  )
}

export default PostView
