import React from 'react'
import 'twin.macro'

export default function Footer ({ children, ...rest }) {
  return <div {...rest} tw='bg-pink-500'>{children}</div>
}
