import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'


const ReadOnly = props => {

  const renderMark = (props, editor, next) => {
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

  const renderNode = (props, editor, next) => {
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

  const { post } = props
  return (
    <Editor
      className='post'
      value={Value.fromJSON(post)}
      renderMark={renderMark}
      renderNode={renderNode}
      readOnly
    />
  )
}

export default ReadOnly
