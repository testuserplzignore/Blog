import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Code from "@convertkit/slate-code"

import { createPost } from '../../services/posts'
import {
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
  initialValue,
} from './slateHelpers'

const plugins = [Code({
  highlight: true,
  block: "code",
  line: "code-line",
  classNames: {
    block: "code",
    line: "code-line"
  }
})]

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
        className={isActive ? 'slateButton-active' : 'slateButton'}
        onMouseDown={event =>this.onClickMark(event, type)}
      >
        <div className='icon'>{icon}</div>
      </button>
    )
  }

  onKeyDown = (event, editor, next) => {
    let mark
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }
    event.preventDefault()
    editor.toggleMark(mark)
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
          {this.renderMarkButton('bold', <strong>B</strong>)}
          {this.renderMarkButton('italic', <em>I</em>)}
          {this.renderMarkButton('underlined', <u>U</u>)}
          {this.renderMarkButton('code', <code>`</code>)}
        </div>
        <Editor
          spellcheck
          autoFocus
          className='editor'
          plugins={plugins}
          value={value}
          ref={this.ref}
          onChange={handleChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </>
    )
  }
}

export default SlateEditor
