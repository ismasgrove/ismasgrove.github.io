import React from 'react'
import tw from 'twin.macro'

const ContainerDiv = tw.div`prose
bg-primary rounded-b
flex flex-col z-10 order-last min-w-full
transition-all duration-200
rounded
lg:order-first lg:max-width[400px] lg:min-width[400px]
xl:max-width[450px] xl:min-width[450px]
lg:shadow-xl
lg:ml-20 lg:my-24
xl:ml-32
2xl:ml-40
`

export default function Container({ children }) {
  return (
    <ContainerDiv>
      {children}
    </ContainerDiv>
  )
}
