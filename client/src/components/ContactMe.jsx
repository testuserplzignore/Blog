import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'

function ContactMe(props) {
  const [collapsed, setCollapsed] = useState(true)

  const handleClick = (e) => {
    setCollapsed(!collapsed)
  }
  return(
    <>
    <div
    className={collapsed ? 'contact-me' : 'contact-me-expanded'}
    onClick={collapsed ? handleClick : null}
    >
      Contact Me
      {!collapsed &&
        <Form style={{ padding: '.5em' }}
          method="POST"
          action="https://formspree.io/rbrtmorrissey86@gmail.com"
          className='formspree'

        >
          <Form.Field>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
            />
          </Form.Field>
          <Form.Field>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
            />
          </Form.Field>
          <Form.TextArea
            name='message'
            placeholder='Your message'
          />
          <Button type='submit'>Send Message</Button>
        </Form>
      }
    </div>
    {!collapsed &&
      <div
        className='modal-background'
        onClick={handleClick}
      />
    }
    </>
  );
};

export default ContactMe
