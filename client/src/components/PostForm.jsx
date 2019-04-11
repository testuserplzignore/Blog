import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import SlateEditor from './slate/SlateEditor'
import {
  plugins,
  initialValue,
  renderMark,
} from './slate/slateHelpers'

const PostForm = props => {
  const {
    formData,
    handleChange,
    handleSlateChange,
    handleSubmit,
  } = props
  return(
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
      />

      <SlateEditor
        value={formData.content}
        handleChange={handleSlateChange}
      />

      <input type='submit' onSubmit={handleSubmit} />
    </form>
  )
}

export default PostForm
