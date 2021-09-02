import React, { useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'

import frag from './shaders/home/fragment.glsl'
import vert from './shaders/home/vertex.glsl'
import BackgroundCanvas from '../components/BackgroundCanvas'
import { ThemeContext } from '../components/ThemeContext'
import Mug from '../gltfjsx/Mug'

const ShadowPlane = (props) => {
    return (
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeBufferGeometry attach='geometry' args={[50, 50, 1]} />
            <shadowMaterial attach='material' color='#272727'/>
        </mesh>
    )
}

const FluidMaterial = shaderMaterial(
    { time: 0 }, vert, frag
)

extend({ FluidMaterial })

const Fluid = () => {
    const ref = useRef()
    useFrame((state) => {
        ref.current.uniforms.time.value = state.clock.getElapsedTime().toPrecision(6)
    })
    return (
        <mesh position={[0, 1.7, 0]} rotation={[0, Math.PI *0.5, 0]} receiveShadow castShadow >
            <cylinderBufferGeometry attach='geometry' args={[0.95, 0.8, 0.1, 128, 128]} />
            <fluidMaterial ref={ref} attach='material' time={0} />
            {/* <meshPhongMaterial attach='material' color='green' /> */}
        </mesh>
    )
}

export default function Landing() {
    return (
        <BackgroundCanvas shadows colorManagement gl={{ alpha: false }} camera={{position: [0, 7, 4]}}>
            <color attach='background' args={['#666']} />
            {/* b7dee8 */}
            <ambientLight />
            <ShadowPlane />
            <spotLight args={[0xffffff, 5, 30, Math.PI * 0.15, 0.25, 3]} position={[-6, 6, 6]} castShadow 
            shadow-mapSize-width={1024} shadow-mapSize-height={1024}
                shadow-camera-near={1} shadow-camera-far={30}
                // angle={0.3} penumbra={1} intensity={2}
            />
            <Fluid />
            <Mug rotation={[0, -Math.PI * 0.65, 0]} position={[0, 1, 0]} />
            <OrbitControls />
        </BackgroundCanvas>
    )
}