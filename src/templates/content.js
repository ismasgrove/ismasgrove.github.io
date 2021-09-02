import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import 'twin.macro'
import { Helmet } from 'react-helmet'

import { ThemeContext } from '../components/ThemeContext'
import { SceneContext } from '../components/SceneContext'
import { scenes } from '../components/Scene'

const ThemeToggle = (props) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = () => theme === 'dark'
  const onClick = () => setTheme(isDark() ? 'light' : 'dark')

  const src = isDark() ? 'sun-svgrepo-com.svg' : 'moon-svgrepo-com.svg'

  return (
    <img {...props} alt={isDark() ? 'light mode' : 'dark mode'} src={src} tw='w-9 h-9 cursor-pointer font-size[0]' onClick={onClick} />
  )
}

export default function Content({ data }) {


  const { setScene } = useContext(SceneContext)

  const post = data.markdownRemark
  const scene = data.markdownRemark.frontmatter.sceneCode

  useEffect(() => {
    if (scene) setScene(scenes[scene])
  })

  return (
    <>
      <Helmet>
        <meta charSet='utf8' />
        <title>{post.frontmatter.title}</title>
      </Helmet>
      
      <div tw='flex justify-between items-center pb-4 border-b border-color[var(--accents-color)]'>
        <h1>
          {post.frontmatter.title.toUpperCase()}
      </h1>
        {/* <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'light' : 'dark'} mode</button> */}
        {/* <div tw='cursor-pointer w-12 h-12 bg-green-700 items-center self-center'
          onClick={() => setTheme(isDark() ? 'light' : 'dark')}
        > */}
          <ThemeToggle tw='mr-2' />
        {/* </div> */}
      </div>

      <div tw='overflow-y-auto mt-2 pr-2'>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        sceneCode
      }
    }
  }
`
