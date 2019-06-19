import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'

function ProfileItem(props){
  const { label, item, field, handleUpdate } = props;
  let textInput = React.createRef();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  const toggleEdit = () => {
    setEdit(!edit)
    setValue(item)
    textInput.current.focus();
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {[field]: value};
    handleUpdate(userData);
    setEdit(!edit)
    setValue('')
  }

  useEffect(() => {
    if (typeof item === 'string') {
      setValue(item)
    }
  }, [item])

  return(
    <Form>
      <Form.Field>
        <label>{label}</label>
        <input
          value={value}
          ref={textInput}
          readOnly={!edit}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Form.Group inline>
        <Form.Button onClick={toggleEdit}>
          Edit
        </Form.Button>
        { edit && <Form.Button color='green' onClick={onSubmit}>
          Submit
        </Form.Button> }
      </Form.Group>
    </Form>
  )
}

export default ProfileItem
