import React from 'react'
import { Header, Item, Menu, Icon } from 'semantic-ui-react'
import { projects } from './assets/assets'

const Projects = props => (
  <Item.Group divided style={{ marginTop: '3em' }}>
    <Header as='h2' style={{ fontSize: '2.8em' }}>Projects</Header>
    {projects.map(project => (
      <Item key={project.name} style={{margin: '1em 0'}}>
        <Item.Image
          src={project.img}
          as='a'
          size='medium'
          href={project.link}
          target='_blank'
        />
        <Item.Content>
          <Item.Header as='h2'>{project.name}</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>{project.description}</Item.Description>
          <Menu secondary icon>
            <Menu.Item
              name='github'
              as='a'
              href={project.github}
              target='_blank'
            >
              <Icon
                link
                name='github'
                size='large'
              />
            </Menu.Item>
          </Menu>
        </Item.Content>
      </Item>
    ))}
  </Item.Group>
)

export default Projects
