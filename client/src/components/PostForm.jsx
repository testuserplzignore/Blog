import React, { useState } from 'react'
import SlateEditor from './slate/SlateEditor'
import { initialValue } from './slate/slateHelpers'
import {
  Button,
  Segment,
  Divider,
  Input,
 } from 'semantic-ui-react'

const PostForm = props => {
  const {
    handleSubmit,
  } = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialValue);

  const hasMark = (type) => content.activeMarks.some(mark => mark.type === type);
  const hasBlock = (type) => content.blocks.some(node => node.type === type);
  const onSubmit = () => {
    handleSubmit({title, content});
    setTitle('');
    setContent(initialValue);
  }

  const buttonActive = (
    (title.length > 0) && (
      !!content.data.get('undos') &&
      content.data.get('undos').size > 1
    )
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
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Divider section />

      <SlateEditor
        value={content}
        handleChange={({value}) => {setContent(value)}}
        hasMark={hasMark}
        hasBlock={hasBlock}
      />

      <Button
        color='green'
        onClick={onSubmit}
        disabled={!buttonActive}
      >
        Submit
      </Button>
    </Segment>
  )
}

export default PostForm
