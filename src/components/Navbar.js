import React from 'react'
import 'twin.macro'
import NavButton from '../components/NavButton'

export default function Navbar ({ items }) {
  const buttons = Object.keys(items).map((key) =>
    <NavButton key={key} title={items[key].title} link={items[key].link}>
      objects[item].title
    </NavButton>
  )

  return (
    <navbar tw='pl-4 pb-2 border-b border-black'>
      <li tw='inline'>
        {buttons}
      </li>
    </navbar>
  )
}
