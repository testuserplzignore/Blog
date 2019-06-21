import React from 'react'
import { Container, Card, Header, Image } from 'semantic-ui-react'
import { skills } from './assets/assets'

const Skills = (props) => (
  <Container style={{ marginTop: '3em' }}>
    <Header as='h2' style={{ fontSize: '2.8em' }}>Skills</Header>
    <Card.Group centered >
      {skills.map(skill=>(
        <Card key={skill.name}>
          <Card.Content>
            <Image src={skill.img} size="tiny" alt={skill.name} floated='right'/>
            <Card.Header as='h3'>{skill.name}</Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </Container>
)

export default Skills
