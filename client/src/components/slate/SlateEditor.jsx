import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import { createPost } from '../../services/posts'
import {
  plugins,
  initialValue,
} from './slateHelpers'

class SlateEditor extends Component {

  ref = editor => {
    this.editor = editor
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.props.hasMark(type)
    return (
      <button
        active={`${isActive}`}
        onClick={event => this.onClickMark(event, type)}
      >
        <div className='icon'>{icon}</div>
      </button>
    )
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  render() {
    const {
      value,
      handleChange,
    } = this.props
    return (
      <>
      <div className = 'toolbar'>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </div>
      <Editor
        className='editor'
        plugins={plugins}
        value={value}
        ref={this.ref}
        onChange={handleChange}
        renderMark={this.renderMark}
      />
      </>
    )
  }
}

export default SlateEditor
