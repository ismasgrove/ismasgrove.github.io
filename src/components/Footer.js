import React from 'react'
import 'twin.macro'

export default function Footer ({ children, ...rest }) {
  return <footer tw='pl-2' {...rest}>{children}</footer>
}
