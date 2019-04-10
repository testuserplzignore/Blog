import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import { createPost } from '../../services/posts'
import {
  plugins,
  initialValue,
  renderMark,
} from './slateHelpers'

class SlateEditor extends Component {
  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    if (value.document != this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
    }

    this.setState({ value })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const content = localStorage.getItem('content');
    const data = {
      title: 'title',
      content: content
    }
    const respData = await createPost(data)
    console.log(respData);
  }

  // Render the editor.
  render() {
    console.log(this.state.value);
    return (
      <>
        <Editor
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderMark={renderMark}
        />

        <button onClick={this.onSubmit}>Submit</button>
      </>
    )
  }
}

export default SlateEditor
