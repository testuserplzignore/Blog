import React from 'react'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import {
  renderMark,
} from './slateHelpers'


const ReadOnly = props => {
  const { post } = props
  return (
    <Editor
      value={Value.fromJSON(post)}
      renderMark={renderMark}
      readOnly
    />
  )
}

export default ReadOnly
