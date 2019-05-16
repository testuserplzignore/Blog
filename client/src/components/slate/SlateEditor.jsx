import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Code from "@convertkit/slate-code"

import { createPost } from '../../services/posts'
import {
  SoftBreak,
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
  initialValue,
} from './slateHelpers'

const plugins = [
  Code({
    highlight: true,
    block: "code",
    line: "code-line",
    classNames: {
      block: "code",
      line: "code-line"
    }
  })
]

const DEFAULT_NODE = 'paragraph'

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
        className={isActive ? 'button button-active small' : 'button small'}
        onMouseDown={event =>this.onClickMark(event, type)}
      >
        <div className='icon'>{icon}</div>
      </button>
    )
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    if (type !== 'bulleted-list' && type !== 'numbered-list' && type !== 'code-block') {
      const isActive = this.props.hasBlock(type)
      const isList = this.props.hasBlock('list-item')
      const isCode = this.props.hasBlock('code-line')

      if (isList || isCode) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
          .unwrapBlock('code-block')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      const isList = this.props.hasBlock('list-item')
      const isCode = this.props.hasBlock('code-line')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isCode && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('code-block')
      } else if (isCode) {
        editor.unwrapBlock('code-block').wrapBlock(type)
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else if (type === 'bulleted-list' || type === 'numbered-list'){
        editor.setBlocks('list-item').wrapBlock(type)
      } else {
        editor.setBlocks('code-line').wrapBlock(type)
      }
    }
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.props.hasBlock(type)
    if (['numbered-list', 'bulleted-list', 'code-block'].includes(type)) {
      const { value: { document, blocks } } = this.props

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = (this.props.hasBlock('list-item') || this.props.hasBlock('code-line')) && parent && parent.type === type
      }
    }

    return (
      <button
        className={isActive ? 'button button-active small' : 'button small'}
        onMouseDown={event => this.onClickBlock(event, type)}
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

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'code-block':
        return <pre {...attributes}>{children}</pre>
      case 'code-line':
        return <div {...attributes}>{children}</div>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
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
          <div className='toolbar-group'>
            <ul className='button-group'>
              <li>{this.renderMarkButton('bold', <strong>B</strong>)}</li>
              <li>{this.renderMarkButton('italic', <em>I</em>)}</li>
              <li>{this.renderMarkButton('underlined', <u>U</u>)}</li>
              <li>{this.renderMarkButton('code', <code>`</code>)}</li>
            </ul>
          </div>
          <div className='toolbar-group'>
            <ul className='button-group'>
              <li>{this.renderBlockButton('code-block', 'Code Block')}</li>
              <li>{this.renderBlockButton('heading-two', 'Heading Two')}</li>
              <li>{this.renderBlockButton('block-quote', 'Quote')}</li>
              <li>{this.renderBlockButton('numbered-list', 'numbered list')}</li>
              <li>{this.renderBlockButton('bulleted-list', 'bullet list')}</li>
            </ul>
          </div>
        </div>
        <Editor
          spellcheck
          className='editor'
          plugins={plugins}
          value={value}
          ref={this.ref}
          onChange={handleChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
        />
      </>
    )
  }
}

export default SlateEditor
