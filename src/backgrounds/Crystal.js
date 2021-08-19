import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { useControls } from 'leva'
import BackgroundCanvas from '../components/BackgroundCanvas'


const Plane = props => {
  const plane = useRef()
  return (<mesh
    {...props}
    ref={plane}
      >
        <planeBufferGeometry attach='geometry' args={[60, 50, 1, 1]} />
        <meshPhongMaterial
      attach='material'
      color={props.color}
        />
  </mesh>
  )
}

const factor = Math.random()

const Dodecahedron = props => {
  const dodeca = useRef()
  useFrame((state, delta) => {
    dodeca.current.rotation.y = dodeca.current.rotation.x += 2 * delta
    dodeca.current.position.x = 5 * Math.sin((factor + 0.5) * 2 * state.clock.getElapsedTime() * props.rotDir)
    dodeca.current.position.y = (factor * 3 + 1) * Math.cos(2 * state.clock.getElapsedTime()) * props.rotDir + 2
    dodeca.current.position.z = 5 * Math.cos((factor + 0.5) * 2 * state.clock.getElapsedTime() * props.rotDir)
  })

  return (
      <mesh
        {...props}
          ref={dodeca}
      >
        <dodecahedronBufferGeometry attach='geometry' args={[1, 0]}/>
          <meshPhongMaterial
        attach='material'
        color={props.color}
        />
      </mesh>
  )
}

const Crystal = props => {
  const upper = useRef()
  const lower = useRef()

  useFrame((_, delta) => {
    upper.current.rotation.y += 0.8 * delta
    lower.current.rotation.y += 0.8 * delta
  })

  return (
    <group
      position={[0, 2, 0]}
      scale={[0.8, 0.8, 0.8]}
    >
      <mesh
      {...props}
        ref={upper}
        position={[0, 3, 0]}
      >
        <coneBufferGeometry attach='geometry' args={[4, 6, 4]}/>
        <meshPhongMaterial attach='material' color={props.color} />
      </mesh>
      <mesh
      {...props}
        ref={lower}
        position={[0, -3, 0]}
        rotation={[0, 0, Math.PI]}
      >
        <coneBufferGeometry attach='geometry' args={[4, 6, 4]}/>
        <meshPhongMaterial attach='material' color={props.color} />
      </mesh>
    </group>

  )
}

const CameraMove = () => {
  useFrame((state) => {
    state.camera.position.x = 50 * Math.sin(-0.3 * state.clock.getElapsedTime())
    state.camera.position.z = 50 * Math.cos(-0.3 * state.clock.getElapsedTime())
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function CrystalDemo (props) {
  const [light, lightSet] = useState()
  const [spot, spotSet] = useState()
  const { dodecaColor, crystalColor, planeColor } = useControls({
    dodecaColor: '#aa0798',
    crystalColor: '#0000ff',
    planeColor: '#444444'
  })
  const helpersVisible = false

  return (
      <BackgroundCanvas camera={{ fov: 45, position: [0, 10, 0] }} shadows >
        <ambientLight />
        <pointLight castShadow shadow-camera-near={10} shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={60} position={[60 / 4, 10, -50 / 4]}
          args={[0xffffff, 5, 50, 2]} ref={lightSet} />
        {helpersVisible && light && <pointLightHelper args={[light, 1]} />}
        <spotLight args={[0xffffff, 10, 80, Math.PI * 0.1, 0.25, 0]} position={[-30, 10, 25]} castShadow ref={spotSet} shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          shadow-camera-near={5} shadow-camera-far={65} shadow-camera-fov={30} />
        {helpersVisible && spot && <spotLightHelper args={[spot]} />}
        {helpersVisible && spot && <cameraHelper args={[spot.shadow.camera]} />}
        <Dodecahedron scale={[0.6, 0.6, 0.6]} color={dodecaColor} position={[20, 4, 0]} castShadow rotDir={1} />
        <Dodecahedron scale={[0.6, 0.6, 0.6]} color={dodecaColor} position={[0, 10, 0]} castShadow rotDir={-1} />
        <Crystal castShadow color={crystalColor} />
        <Plane color={planeColor} rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -4, 0]} />
        <CameraMove />
        <Sky />
        </BackgroundCanvas>
  )
}
