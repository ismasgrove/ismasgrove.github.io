import React from 'react'
import { graphql } from 'gatsby'
import tw from 'twin.macro'


const ContentTitle = tw.h2`
text-2xl prose prose-green
`

export default function Content ({ data }) {
  const post = data.markdownRemark

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
