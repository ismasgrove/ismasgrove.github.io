import React from 'react'
import tw from 'twin.macro'

const Container = tw.div`prose
      z-10 pt-6 pb-4 px-4
      flex flex-col
      bg-primary lg:rounded-2xl lg:border-b-8 border-color[var(--accents-color)]
      min-w-full
      transition-all duration-200
      font-mono
`

export default function PostContainer({ children, ...rest }) {
	return <Container {...rest}>{children}</Container>
}
