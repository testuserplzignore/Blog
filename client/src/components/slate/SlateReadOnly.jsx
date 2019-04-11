import React from 'react'
import Plain from 'slate-plain-serializer'
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
  const { post } = props
  return (
    <Editor
      className='editor'
      value={Value.fromJSON(post)}
      renderMark={renderMark}
      readOnly
    />
  )
}

export default ReadOnly
