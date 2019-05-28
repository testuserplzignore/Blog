import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import SlateEditor from './slate/SlateEditor'
import '../style/editor.css'
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
    hasMark,
    hasBlock,
    handleSubmit,
  } = props

  const buttonActive = !!(
    (formData.title.length > 0) & (
      !!formData.content.data.get('undos') &&
      formData.content.data.get('undos').size > 1)
    );
  return(
    <div className='post'>
      <input
        className='title-input'
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
      />

      <SlateEditor
        value={formData.content}
        handleChange={handleSlateChange}
        hasMark={hasMark}
        hasBlock={hasBlock}
      />

      <button
        className='button large green'
        onClick={handleSubmit}
        disabled={!buttonActive}
      >
        Submit
      </button>
    </div>
  )
}

export default PostForm
