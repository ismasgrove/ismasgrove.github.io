import React from 'react'
import tw from 'twin.macro'

// const Container = () => (
//     <div css={[tw`prose
//       bg-primary border border-white
//       z-10 min-w-full
//       transition-all duration-200
//       py-6 px-4
//       font-mono`, { ...rest },
//     css`
//         scrollbar-width: thin;
//         scrollbar-color: blue orange;
//       `,
//     ]}
//     />
// )

const Container = tw.div`prose
      z-10 pt-6 pb-4 px-4
      flex flex-col
      bg-primary lg:rounded-2xl lg:border-b-8 border-color[var(--accents-color)]
      min-w-full
      transition-all duration-200
      font-mono
`

// const Container = ({children}) => (
//   <div tw='bg-primary min-w-full py-6 px-4'>
    
    
//   </div>
// )

export default function PostContainer({ children, ...rest }) {
  return (
    <Container {...rest} >
      {children}      
    </Container>
  )
}