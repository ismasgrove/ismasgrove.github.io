import React from 'react'
import { Helmet } from 'react-helmet'
import Container from '../components/Container'
import Scene from '../components/Scene'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { GlobalStyles } from 'twin.macro'

const footerInfo = '2021.'
const navbarObjs =
{
  home: {
    title: 'home',
    link: '/'
  },
  placebo: {
    title: 'placebo',
    link: '/'
  }
}

const footer = (
<Footer>
    {footerInfo}
</Footer>)

const navbar = (
  <Navbar items={navbarObjs}/>
)

const Layout = ({ children, ...rest }) => (
  <div tw='flex overflow-hidden h-screen'{...rest}>
    <GlobalStyles />
        <Helmet>
        <meta charSet='utf8' />
        <title>ismasgrove</title>
    </Helmet>
      <Container>
        {navbar}
      <div tw='overflow-auto flex-grow p-2.5'>{children}</div>
        {footer}
      </Container>
        <Scene />
    </div>
)

export default Layout
