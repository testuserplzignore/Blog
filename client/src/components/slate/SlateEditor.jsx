import React, { Component } from 'react'
import { Editor } from 'slate-react'
import PlaceholderPlugin from 'slate-react-placeholder'
import boldIcon from './icons/bold.svg'
import italicIcon from './icons/italic.svg'
import underlineIcon from './icons/underline.svg'
import codeSnippetIcon from './icons/highlighter.svg'
import headerIcon from './icons/header.svg'
import numberedListIcon from './icons/numbered_list.svg'
import bulletListIcon from './icons/bullet_list.svg'
import codeBlockIcon from './icons/code_block.svg'
import quoteIcon from './icons/quote.svg'

import {
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
  SoftBreak,
} from './slateHelpers'

const plugins = [
  {
    queries: {
      isEmpty: editor => {
        console.log(editor.value.document.text === '');
        return editor.value.document.text === ''
      },
    },
  },
  PlaceholderPlugin({
    placeholder: 'Hello yes I am a placeholder',
    when: 'isEmpty',
    style: { color: 'black', opacity: '1', fontFamily: 'monospace' },
  }),
  SoftBreak({shift:true}),
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
        <img className='icon' src={icon} alt='editor icons'/>
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
        <img className='icon' src={icon} alt='editor icons'/>
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

  renderBlock = (props, editor, next) => {
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
              <li>{this.renderMarkButton('bold', boldIcon)}</li>
              <li>{this.renderMarkButton('italic', italicIcon)}</li>
              <li>{this.renderMarkButton('underlined', underlineIcon)}</li>
              <li>{this.renderMarkButton('code', codeSnippetIcon)}</li>
            </ul>
          </div>
          <div className='toolbar-group'>
            <ul className='button-group'>
              <li>{this.renderBlockButton('code-block', codeBlockIcon)}</li>
              <li>{this.renderBlockButton('heading-two', headerIcon)}</li>
              <li>{this.renderBlockButton('block-quote', quoteIcon)}</li>
              <li>{this.renderBlockButton('numbered-list', numberedListIcon)}</li>
              <li>{this.renderBlockButton('bulleted-list', bulletListIcon)}</li>
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
          renderBlock={this.renderBlock}
        />
      </>
    )
  }
}

export default SlateEditor
