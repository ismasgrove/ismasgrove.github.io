import React, { useContext } from 'react'
import tw, {styled} from 'twin.macro'
import NavButton from '../components/NavButton'

import { ThemeContext } from '../components/themeContext'

const ThemeToggle = (props) => {
  const { theme, setTheme } = useContext(ThemeContext)
  
  const isDark = () => theme === 'dark'
  
  const ThemeToggle = styled.button(() => [
      tw`w-7 h-7 justify-end focus:outline-none rounded`,
      isDark() ? tw`bg-gray-200` : tw`bg-gray-800`
  ]
  )

  return (
    <ThemeToggle
      onClick={() => setTheme(isDark() ? 'light' : 'dark')}
      {...props}
    />
  )
}

export default function Navbar ({ items, ...rest }) {
  const buttons = Object.keys(items).map((key) =>
    <NavButton key={key} title={items[key].title} link={items[key].link}>
      objects[item].title
    </NavButton>
  )

  return (
    <div tw='inline-grid grid-cols-2 items-center'  {...rest}>
      <li tw='inline'>
        {buttons}
      </li>
      <ThemeToggle tw='justify-self-end mr-4 transform duration-100 hover:rotate-45' />
      </div>
  )
}
