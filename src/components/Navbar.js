import React, { useContext } from 'react'
import 'twin.macro'
import NavButton from '../components/NavButton'

import { SceneContext } from './SceneContext'

const NavContainer = ({ children, ...rest }) => {
  return <div tw='prose font-mono font-extrabold
      grid grid-cols-2 justify-between lg:rounded-b-lg border-b-4 
      border-color[var(--accents-color)] bg-primary z-10'  {...rest}>
        {children}
      </div>
}

export default function Navbar({ children, ...rest }) {
  const { scene, _ } = useContext(SceneContext)
  const navbarObjs = {
    scene: {
      title: 'SCENE',
      link: scene
    },
    about: {
      title: 'ABOUT',
      link: '/about'
    }
  }
  
  const buttons = Object.keys(navbarObjs).map((key) =>
    <NavButton key={key} title={navbarObjs[key].title} link={navbarObjs[key].link}>
      objects[item].title
    </NavButton>
  )

  return (
    <NavContainer {...rest}>
      {buttons}
    </NavContainer>
  )
}
