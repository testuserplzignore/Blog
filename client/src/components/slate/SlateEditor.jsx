import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import { createPost } from '../../services/posts'
import {
  plugins,
  initialValue,
  renderMark,
} from './slateHelpers'

const SlateEditor = props => {
    const {
      value,
      handleChange,
    } = props
  return (
    <Editor
      className='editor'
      plugins={plugins}
      value={value}
      onChange={handleChange}
      renderMark={renderMark}
    />
  )
}

export default SlateEditor
