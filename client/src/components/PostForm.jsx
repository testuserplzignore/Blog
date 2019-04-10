import React from 'react'

const PostForm = props => {
  const {
    postFormData,
    handleChange,
    handleSubmit,
  } = props
  return(
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={postFormData.title}
        onChange={handleChange}
      />

      <textarea
        type='textarea'
        name='content'
        placeholder='Post body'
        value={postFormData.content}
        onChange={handleChange}
      />
      <input type='submit' onSubmit={handleSubmit} />
    </form>
  )
}

export default PostForm
