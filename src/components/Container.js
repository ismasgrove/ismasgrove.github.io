import React from 'react'
import tw from 'twin.macro'

export default function Container ({ children, ...rest }) {
  const ContainerDiv = tw.div`prose flex flex-col bg-white z-10 pt-10
  order-last
  min-w-full
  lg:order-first
  lg:max-width[400px] lg:min-width[400px]
  lg:shadow-2xl lg:ml-20 lg:my-16
  xl:max-width[450px] xl:min-width[450px] xl:ml-32
  2xl:ml-40`

  return (
    <ContainerDiv {...rest}>
      {children}
    </ContainerDiv>
  )
}
