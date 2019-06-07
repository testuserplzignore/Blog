import React from 'react'
import SlateEditor from './slate/SlateEditor'
import {
  Button,
  Segment,
  Divider,
  Input,
 } from 'semantic-ui-react'
import '../style/editor.css'

const PostForm = props => {
  const {
    formData,
    handleChange,
    handleSlateChange,
    hasMark,
    hasBlock,
    handleSubmit,
  } = props

  const buttonActive = (
    (formData.title.length > 0) && (
      !!formData.content.data.get('undos') &&
      formData.content.data.get('undos').size > 1)
    );
  return(
    <Segment>
      <Input
        fluid
        transparent
        name='title'
        placeholder='Title'
        size='massive'
        autoComplete="off"
        value={formData.title}
        onChange={handleChange}
      />

      <Divider section />

      <SlateEditor
        value={formData.content}
        handleChange={handleSlateChange}
        hasMark={hasMark}
        hasBlock={hasBlock}
      />

      <Button
        color='green'
        onClick={handleSubmit}
        disabled={!buttonActive}
      >
        Submit
      </Button>
    </Segment>
  )
}

export default PostForm
