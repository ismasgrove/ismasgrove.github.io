import React from 'react'
import { Link } from 'gatsby'

import 'twin.macro'

export default function NavButton (props) {
  return (
    <Link tw='mr-4' to={props.link}>{props.title}</Link>
  )
}
