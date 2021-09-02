import React from 'react'
import 'twin.macro'

export default function Footer ({ children, ...rest }) {
  return (
    <div tw='prose z-10 bg-primary border-b-2 lg:rounded-t-lg border-color[var(--accents-color)]' {...rest}>
      {children}
    </div>
  )
}
