import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Container from '../components/Container'
import Layout from '../components/Layout'
import Scene from '../components/Scene'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import 'twin.macro'

const footerInfo = '2021.'

const footer = (
<Footer>
    <Link to="/about/">{footerInfo}</Link>
</Footer>)

const navbar = (
  <Navbar titles={['home', 'placebo']}/>
)

export default function Home () {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf8' />
        <title>ismasgrove</title>
      </Helmet>
      <Container>
        {navbar}
        <Content/>
        {footer}
      </Container>
        <Scene />
    </Layout>
  )
}
