import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
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

      <Editor
        plugins={plugins}
        value={formData.content}
        onChange={handleSlateChange}
        renderMark={renderMark}
      />

      <textarea
        type='textarea'
        name='content'
        placeholder='Post body'
        value={formData.content}
        onChange={handleChange}
      />

      <input type='submit' onSubmit={handleSubmit} />
    </form>
  )
}

export default PostForm
