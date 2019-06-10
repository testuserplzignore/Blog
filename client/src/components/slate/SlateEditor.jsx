import React, { Component } from 'react'
import { Editor } from 'slate-react'
import PlaceholderPlugin from 'slate-react-placeholder'
import {
  Button,
  Icon,
} from 'semantic-ui-react'

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
      <Button
        icon
        active={isActive}
        onMouseDown={event =>this.onClickMark(event, type)}
      >
        <Icon name={icon}/>
      </Button>
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
      <Button
        icon
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon name={icon}/>
      </Button>
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
      isReadOnly,
      handleChange,
    } = this.props
    return (
      <>
        {!isReadOnly &&
          <>
            <Button.Group>
              {this.renderMarkButton('bold', 'bold')}
              {this.renderMarkButton('italic', 'italic')}
              {this.renderMarkButton('underlined', 'underline')}
              {this.renderMarkButton('code', 'magic')}
            </Button.Group>{' '}

            <Button.Group>
              {this.renderBlockButton('code-block', 'code')}
              {this.renderBlockButton('heading-two', 'heading')}
              {this.renderBlockButton('block-quote', 'quote right')}
              {this.renderBlockButton('numbered-list', 'numbered list')}
              {this.renderBlockButton('bulleted-list', 'list ol')}
            </Button.Group>
          </>
        }

        <Editor
          spellcheck
          className='editor'
          style={!isReadOnly ? {minHeight: '200px'} : null}
          readOnly={isReadOnly}
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
