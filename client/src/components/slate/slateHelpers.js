import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'

const initialValue = Value.fromJSON(
  {
    "object": "value",
    "document": {
      "object": "document",
      "nodes": [
        {
          "object": "block",
          "type": "paragraph",
          "nodes": [
            {
              "object": "text",
              "text": ""
            }
          ]
        }
      ]
    }
  }
)

function SoftBreak(options = {}) {
  return {
    onKeyDown(event, change, next) {
      if (event.key !== 'Enter') return next()
      if (options.shift && event.shiftKey === true) return next()
      return change.insertText('\n')
    },
  }
}


const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+k')


export {
  SoftBreak,
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
  initialValue,
}
