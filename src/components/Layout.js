import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { GlobalStyles } from 'twin.macro' 
import StylesBase from './StylesBase'
import Scene from './Scene'
import Container from './Container'
import Footer from './Footer'
import Navbar from './Navbar'

const footerInfo = '2020 ©'
const navbarObjs =
{
  home: {
    title: 'home',
    link: '/'
  },
  about: {
    title: 'about',
    link: '/about'
  }
}

const navbar = (
  <Navbar tw='pl-4 pb-2 pt-8 border-b border-gray-500' items={navbarObjs} />
)


const footer = (
  <Footer tw='border-t border-gray-500'>
    {footerInfo}
  </Footer>)

  
const PostContainer = ({ children }) => <div tw='overflow-auto flex-grow p-2'>{children}</div>

const Layout = ({ children }) => {
  return (<div tw='flex flex-col lg:flex-row lg:overflow-hidden h-screen'>
    <GlobalStyles />
    <StylesBase />
    <Helmet htmlAttributes={{
      lang: 'en'
    }}>
      <meta charSet='utf8' />
      <title>ismasgrove</title>
    </Helmet>
    <Scene />
      <Container>
        {navbar}
        <PostContainer>
          {children}
        </PostContainer>
      {footer}
      </Container>
  </div>)
}

export default Layout
