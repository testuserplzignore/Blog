
import cPlusPlus from './c++.svg'
import css3 from './css-3.svg'
import django from './django.svg'
import flask from './flask.svg'
import html5 from './html-5.svg'
import python from './python.svg'
import rails from './rails.svg'
import reactImg from './react.svg'
import ruby from './ruby.svg'
import javascript from './javascript.svg'

import snakeGame from './snakeGame.png'
import artBeat from './artBeat.png'
import bandIt from './band-it.png'

const skills = [
  {
    img: javascript,
    name: 'javascript'
  },
  {
    img: html5,
    name: 'HTML 5'
  },
  {
    img: css3,
    name: 'CSS 3'
  },
  {
    img: reactImg,
    name: 'React'
  },
  {
    img: python,
    name: 'Python'
  },
  {
    img: flask,
    name: 'Flask'
  },
  {
    img: django,
    name: 'Django'
  },
  {
    img: ruby,
    name: 'Ruby'
  },
  {
    img: rails,
    name: 'Ruby on Rails'
  },
  {
    img: cPlusPlus,
    name: 'C++'
  }
]

const projects = [
  {
    name: 'Snake',
    description: 'Classic game of snake built in vanilla JS',
    img: snakeGame,
    link: `http://tacky-thrill.surge.sh/`,
    github: `https://github.com/ElllGeeEmm/snake`,
  },
  {
    name: 'NY Art Beat',
    description: 'A react front end built for the NY Art Beat API',
    img: artBeat,
    link: `http://ny-art-beat-react.surge.sh/`,
    github: `https://github.com/ElllGeeEmm/ny-art-beat-app`,
  },
  {
    name: 'Band-It',
    description: 'Full crud app built in React and Express',
    img: bandIt,
    link: `http://banditproject.surge.sh/`,
    github: `https://github.com/mikebrown4000/Band-It`,
  },
]

export {
  skills,
  projects,
}
