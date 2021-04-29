import React from 'react'
import { graphql } from 'gatsby'
import tw from 'twin.macro'

export default function Content ({ data }) {
  const post = data.markdownRemark

  const ContentTitle = tw.h2`
    text-2xl
  `

  console.log(post.html)

  return (
    <div>
        <ContentTitle>
          {post.frontmatter.title}
        </ContentTitle>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
