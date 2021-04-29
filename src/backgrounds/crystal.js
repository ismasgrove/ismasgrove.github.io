import React from 'react'
import { Link } from 'gatsby'
import Container from '../components/Container'
import Scene from '../components/Scene'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const footerInfo = '2021.'

const footer = (
<Footer>
    <Link to="/about/">{footerInfo}</Link>
</Footer>)

const navbar = (
  <Navbar titles={['home', 'placebo']}/>
)

const Crystal = ({ children, ...rest }) => (
    <div tw='flex overflow-hidden h-screen' {...rest}>
      <Container>
        {navbar}
        <div tw='overflow-auto flex-grow'>{children}</div>
        {footer}
      </Container>
        <Scene />
    </div>
)

export default Crystal
