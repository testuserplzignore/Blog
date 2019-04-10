import React from 'react'
import { Value } from 'slate'

const initialValue = Value.fromJSON(
  {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  }
)

const renderMark = (props, editor, next) => {
  switch (props.mark.type) {
    case 'bold':
      return <strong>{props.children}</strong>
    case 'code':
      return <code>{props.children}</code>
    case 'italic':
      return <em>{props.children}</em>
    case 'strikethrough':
      return <del>{props.children}</del>
    case 'underline':
      return <u>{props.children}</u>
    default:
      return next()
  }
}

function MarkHotkey(options) {
  const { type, key } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.ctrlKey || event.key != key) return next()

      // Prevent the default characters from being inserted.
      event.preventDefault()

      // Toggle the mark `type`.
      editor.toggleMark(type)
    },
  }
}

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'c', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 's', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]


export {
  plugins,
  initialValue,
  renderMark,
}
