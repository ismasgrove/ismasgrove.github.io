import React from 'react'
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
  <Navbar titles={['home', 'about', 'articles']}/>
)

export default function Home () {
  return (
    <Layout>
      <Container>
        {navbar}
        <Content/>
        {footer}
      </Container>
      <Scene/>
    </Layout>
  )
}
