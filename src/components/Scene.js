import React, { useContext } from 'react'

import Flux from '../backgrounds/Flux'
import Crystal from '../backgrounds/Crystal'
import InstancedSpheresPhysics from '../backgrounds/InstancedSpheresPhysics'
import Boids from '../backgrounds/Boids'
import Landing from '../backgrounds/Landing'
import { SceneContext } from './SceneContext'
import 'twin.macro'

export const scenes = {
  LANDING: '/',
  FLUX: '/flux',
  BOIDS: '/boids',
  SPHERES: '/spheres',
  CRYSTAL: '/crystal'
}

export default function Scene () {
  const { scene } = useContext(SceneContext)
  return <>
    {scene === scenes.LANDING && <Landing />}
    {scene === scenes.FLUX && <Flux />}
    {scene === scenes.BOIDS && <Boids />}
    {scene === scenes.SPHERES && <InstancedSpheresPhysics />}
    {scene === scenes.CRYSTAL && <Crystal />}   
  </>
}
