import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { GlobalStyles } from 'twin.macro' 
import StylesBase from './StylesBase'
import Scene from './Scene'
import Container from './Container'
import Footer from './Footer'
import Navbar from './Navbar'

const footerInfo = 'footer.'
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

const navbar = (
  <Navbar tw='pl-4 pb-2 pt-8  border-b border-black' items={navbarObjs} />
)


const footer = (
  <Footer tw='bg-secondary'>
    {footerInfo}
  </Footer>)

  
const PostContainer = ({ children }) => <div tw='overflow-auto flex-grow p-2'>{children}</div>

const Layout = ({ children }) => {
  return (<div tw='flex flex-col lg:flex-row lg:overflow-hidden h-screen'>
    <GlobalStyles />
    <StylesBase />
    <Helmet>
      <meta charSet='utf8' />
      <title>ismasgrove</title>
    </Helmet>
      <Container>
        {navbar}
        <PostContainer>
          {children}
        </PostContainer>
      {footer}
      </Container>    
    <Scene />
  </div>)
}

export default Layout
