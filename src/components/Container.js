import React, { useContext } from 'react'
import tw from 'twin.macro'

import { ThemeContext } from './themeContext'

const ContainerDiv = tw.div`prose
bg-primary rounded-b
flex flex-col z-10 order-last min-w-full
lg:order-first lg:max-width[400px] lg:min-width[400px]
xl:max-width[450px] xl:min-width[450px]
lg:shadow 
lg:ml-20 lg:my-16
xl:ml-32
2xl:ml-40
transition-all duration-200`

export default function Container({ children }) {

  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <ContainerDiv>
      {children}
    </ContainerDiv>
  )
}
