import * as THREE from 'three'
import React, { useMemo } from 'react'
import { Canvas, useFrame, useThree, PerspectiveCamera } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { useControls } from 'leva'
import { paletteLerpRGB } from '../utils/gfx_utils'

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[25, 25]} />
      <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
  )
}

function Spheres({ spheres, palette }) {
  const radius = 0.1
  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: radius,
    position: [(Math.random() * 2 - 0.5) * 0.005 * spheres, Math.random() * 3, (Math.random() * 2 - 0.5) * 0.005 * spheres]
  }))

  const colors = useMemo(() => {
    const array = new Float32Array(spheres * 3)
    const color = new THREE.Color()
    for (let i = 0; i < spheres; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)]
      color.set(col).convertSRGBToLinear().toArray(array, i*3)
    }
    return array;
  }, [spheres, palette])

  // useEffect(() => {
  //   for (let i = 0; i < spheres; i++) {
  //     api.at(i).
  //   }
  // }, [radius])

  // const mat4 = new THREE.Matrix4()
  // useLayoutEffect(() => {
  //   for (i = 0; i < spheres; i++)
  //     ref.current.setMatrixAt(i, mat4)
  // })

  let i = 0
  useFrame(() => {
    const cubeToRefersh = i < spheres ? i++ : i = 0
    api.at(cubeToRefersh).position.set((Math.random() + 0.5) * spheres * 0.002 - spheres * 0.001
      , Math.random() * 2.5
      , (-Math.random() * 0.5 * spheres * 0.005) + spheres * 0.0025)
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

function LookAt() {

  useThree((state) => {
    state.camera.lookAt(-1, 0, 0)
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
      max: 1000,
      step: 1
    }
  })

  const colorA_THREE = new THREE.Color(colorA)
  const colorB_THREE = new THREE.Color(colorB)

  const palette = paletteLerpRGB(colorA_THREE, colorB_THREE, colors)

  return (
    <Canvas shadows colorManagement gl={{ alpha: false }} camera={{ position: [0, 2, 4.5], fov: 45 }} >
      <LookAt/>
    <color attach="background" args={['#ffb1e5']} />
    <hemisphereLight intensity={0.35} />
    <spotLight position={[-4, 6, 3]} angle={0.7} distance={25} shadow-camera-far={25} penumbra={1} intensity={2} sof castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Physics key={spheres} broadphase='SAP'>
      <Plane rotation={[-Math.PI / 2, 0, 0]} />
      <Spheres palette={palette} spheres={spheres} />
      </Physics>
  </Canvas>
  )
}
