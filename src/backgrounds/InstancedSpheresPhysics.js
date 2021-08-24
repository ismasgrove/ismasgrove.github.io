import * as THREE from 'three'
import React, { useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, usePlane, useSphere, useCompoundBody } from '@react-three/cannon'
import { useControls } from 'leva'
import { paletteLerpRGB } from '../utils/gfx_utils'
import BackgroundCanvas from '../components/BackgroundCanvas'

function OpenBox({move, sphereRadius, ...props}) {
  const boxEdgeHeight = 1
  const boxWidth = 6
  const boxLength = 10
  const boxThickness = 0.1

  const [ref, api] = useCompoundBody(() => (
    {
      ...props,
      position: [0, 0, 0],
      type: 'Static',
      shapes: [
        { type: 'Box', position: [0, -0.45, 0], rotation: [Math.PI / 2, 0, 0], args: [boxLength, boxWidth, 1] },
        { type: 'Box', position: [boxLength/2, boxEdgeHeight/2-sphereRadius, 0], rotation: [0, Math.PI / 2, 0], args: [boxWidth, boxEdgeHeight, boxThickness + sphereRadius * 2] },
        { type: 'Box', position: [-boxLength/2, ,boxEdgeHeight/2-sphereRadius, 0], rotation: [0, Math.PI / 2, 0], args: [boxWidth, boxEdgeHeight, boxThickness + sphereRadius * 2] },
        { type: 'Box', position: [0, boxEdgeHeight/2, boxWidth/2-sphereRadius], rotation: [0, 0, 0], args: [boxLength, boxEdgeHeight, boxThickness + sphereRadius * 2] },
        { type: 'Box', position: [0, boxEdgeHeight/2, -boxWidth/2-sphereRadius], rotation: [0, 0, 0], args: [boxLength, boxEdgeHeight, boxThickness + sphereRadius * 2] },
      ]
    }
  ))

  useFrame(({ mouse }) => {
    if (!move) {
      api.rotation.set(0, mouse.x * 0.3, mouse.y * 0.3)
    }
  })

  return (
    <group ref={ref}>
      <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <boxBufferGeometry args={[boxLength, boxWidth, boxThickness]} />
        <meshLambertMaterial attach='material' color='grey'/>
      </mesh>
      <mesh position={[boxLength/2, boxEdgeHeight/2 -0.1, 0]} rotation={[0, Math.PI /2, 0]}>
        <boxBufferGeometry args={[boxWidth, boxEdgeHeight, boxThickness]} />
        <meshNormalMaterial/>
      </mesh>
      <mesh position={[-boxLength/2, boxEdgeHeight/2 -0.1, 0]} rotation={[0, Math.PI /2, 0]}>
        <boxBufferGeometry args={[boxWidth, boxEdgeHeight, boxThickness]} />
        <meshNormalMaterial/>
      </mesh>
      <mesh position={[0, boxEdgeHeight/2 -0.1, boxWidth/2]} rotation={[0, 0, 0]}>
        <boxBufferGeometry args={[boxLength, boxEdgeHeight, boxThickness]} />
        <meshNormalMaterial/>
      </mesh>
      <mesh position={[0, boxEdgeHeight/2 -0.1, -boxWidth/2]} rotation={[0, 0, 0]}>
        <boxBufferGeometry args={[boxLength, boxEdgeHeight, boxThickness]} />
        <meshNormalMaterial/>
      </mesh>
    </group>
  )
}

function Spheres({ radius, spheres, palette }) {
  const [ref, {at}] = useSphere(() => ({
    mass: 2,
    args: radius,
    position: [Math.random() * 9.8 - 5, Math.random() * -2 + 4, Math.random() * 5.8 - 3]
  }))

  const randomArray = useMemo(() => {
    const array = []
    for (let i = 0; i < spheres; i++) {
      array.push(Math.floor(Math.random() * palette.length))
    }
    return array
  }, [])

  const colors = useMemo(() => {
    const array = new Float32Array(spheres * 3)
    const color = new THREE.Color()
    for (let i = 0; i < spheres; i++) {
      const col = palette[randomArray[i]]
      color.set(col).convertSRGBToLinear().toArray(array, i*3)
    }
    return array;
  }, [spheres, palette])

  let toReset = []

  useEffect(() => {
    for (let i = 0; i < spheres; i++) {
      at(i).position.subscribe((p) => {
        if (p[1] < -15) {
          toReset.push(i)
        }
      })
    }
  })

  useFrame(() => {
    for (const id of toReset) {
      at(id).position.set(Math.random() * 9.8 - 5, Math.random() * -2 + 8, Math.random() * 5.8 - 3)
    }
    toReset = []
  })

  return (
    <instancedMesh receiveShadow castShadow ref={ref} args={[null, null, spheres]}>
      <sphereBufferGeometry attach="geometry" args={[radius, 20, 20]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
      </sphereBufferGeometry>
      <meshLambertMaterial attach="material" vertexColors />
      </instancedMesh>
  )
}

function LookAt({x_offset, y_offset}) {
  useThree((state) => {
    state.camera.lookAt(x_offset, y_offset, 0)
  })
  return <></>
}

export default function CannonDemo() {
  const { colorA, colorB, colors, spheres } = useControls({
    colorA: '#59f9ff',
    colorB: '#9e2eb4',
    colors: {
      value: 256,
      min: 1,
      max: 512,
      step: 1
    },
    spheres: {
      value: 200,
      min: 50,
      max: 500,
      step: 1
    }
  })

  const sphereRadius = 0.15

  const colorA_THREE = new THREE.Color(colorA)
  const colorB_THREE = new THREE.Color(colorB)

  const palette = paletteLerpRGB(colorA_THREE, colorB_THREE, colors)

  const [move, setMove] = useState(false)

  return (
    <BackgroundCanvas onClick={() => setMove(!move)} shadows colorManagement gl={{ alpha: false }} camera={{ position: [-9, 5, -9], fov: 45 }} >
      <color attach="background" args={['#ffb1e5']} />
    <hemisphereLight intensity={0.35} />
    <spotLight position={[-4, 6, 3]} angle={0.7} distance={25} shadow-camera-far={25} penumbra={1} intensity={2} sof castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <LookAt x_offset={3} y_offset={-0.5}/>
      <Physics iterations={20} tolerance={0.0001} key={spheres} broadphase='Naive' allowSleep={false}>
        <Spheres radius={sphereRadius} palette={palette} spheres={spheres} />
        <OpenBox sphereRadius={sphereRadius} move={move} />
      </Physics>
  </BackgroundCanvas>
  )
}
