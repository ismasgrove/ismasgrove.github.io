import React, { useContext } from 'react'
import tw, {styled} from 'twin.macro'
import NavButton from '../components/NavButton'

import { ThemeContext } from './ThemeContext'


const ThemeToggleButton = styled.button(({isDark}) => {
  return [
  tw`w-7 h-7 justify-end focus:outline-none rounded`,
  isDark() ? tw`bg-gray-100` : tw`bg-gray-800`
  ]})

const ThemeToggle = (props) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = () => theme === 'dark'
  
  return (
    <ThemeToggleButton isDark={isDark}
      title='toggle light/dark mode'
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
      <div tw='inline'>
        {buttons}
        </div>
      <ThemeToggle tw='justify-self-end mr-4 transform duration-100 hover:rotate-45' />
      </div>
  )
}
