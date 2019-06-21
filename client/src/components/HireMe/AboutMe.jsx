import React from 'react'
import { Header, Container } from 'semantic-ui-react'

const AboutMe = props => (
  <Container style={{ marginTop: '3em' }}>
    <Header as='h1' style={{ fontSize: '3.5em' }}>
      Robert
      <br />
      Morrissey
     </Header>
    <Header as='h2'>
      My passion for web development comes from being at the intersection
      of data and people.
    </Header>
    <Container>
      I see web development as being the bridge between
      logical data sets designed for machines and intuitive interfaces built
      for people. As a lifelong learner, I find the neverending challenges
      in building these bridges to be an exciting prospect. When I’m not
      thinking about data, you can find me either binge-watching TV or out
      on a hiking trail with my dog.
    </Container>
  </Container>
)

export default AboutMe
