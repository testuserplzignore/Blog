import React from 'react'
import { Container } from 'semantic-ui-react'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'

function HireMe(props){
  return(
    <Container>
      <AboutMe />
      <Skills />
      <Projects />
    </Container>
  )
}

export default HireMe
