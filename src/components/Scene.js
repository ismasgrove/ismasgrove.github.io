import React, { useContext } from 'react'
import Crystal from '../backgrounds/Crystal'
import InstancedSpheresPhysics from '../backgrounds/InstancedSpheresPhysics'
import Boids from '../backgrounds/Boids'
import { SceneContext } from './SceneContext'
import 'twin.macro'

export const scenes = {
  CRYSTAL: 'crystal',
  SPHERES: 'spherephyics',
  BOIDS: 'boids'
}

export default function Scene () {
  const { scene, _ } = useContext(SceneContext)
  return <>
    {scene === scenes.CRYSTAL && <Crystal />}
    {scene === scenes.SPHERES && <InstancedSpheresPhysics />}
    {scene === scenes.BOIDS && <Boids />}
  </>
}
