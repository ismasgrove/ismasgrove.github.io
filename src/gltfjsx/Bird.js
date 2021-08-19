/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: sketchfab.com/zacxophone
*/

import React, { useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

const Bird = React.forwardRef((props, ref) => {
  const group = useRef()
  const { scene, materials, animations } = useGLTF('/bird.glb')
  const { actions } = useAnimations(animations, ref)
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)

  React.useEffect(() => {
    actions["Armature|Scene|Scene_Armature.001"].startAt(Math.random() * 2 / 3).play()
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={group}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.1]}>
            <primitive object={nodes.Bone} />
            <skinnedMesh
              geometry={nodes.Plane001.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Plane001.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Plane001_1.geometry}
              material={materials['Material.004']}
              skeleton={nodes.Plane001_1.skeleton}
            />
          </group>
      </group>
    </group>
  )
})

useGLTF.preload('/bird.glb')

export default Bird