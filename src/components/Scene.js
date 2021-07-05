import React from 'react'
// eslint-disable-next-line no-unused-vars
import CrystalDemo from '../backgrounds/CrystalDemo'
import CannonDemo from '../backgrounds/CannonDemo'
import AnimationDemo from '../backgrounds/AnimationDemo'
import 'twin.macro'

export default function Scene (props) {
  return <div tw='relative lg:fixed h-full w-full' {...props}>
    <AnimationDemo />
  </div>
}
