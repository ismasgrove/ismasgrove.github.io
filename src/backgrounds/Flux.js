import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import BackgroundCanvas from '../components/BackgroundCanvas'

const Tile = ({ position, rotation }) => {
    const ref = useRef()
    const dir = Math.random() > 0.5 ? 1 : -1
    const rotationSpeed = Math.random() * dir
    const color = new THREE.Color().lerpColors(new THREE.Color('#000'), new THREE.Color('#444'), Math.random())
    useFrame((_, delta) => {
        ref.current.rotateY(rotationSpeed * Math.PI * delta)
    })
    
    return (
        <group ref={ref} position={position}>
            <mesh rotation={rotation}>
                <planeBufferGeometry args={[10, 10, 1, 1]} />
                <meshLambertMaterial color={color} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

const TileStack = ({x, z}) => {
    const ref = useRef()
    const planes = []
    for (let i =-50; i <= 50; i+=10) {
        planes.push(
            <Tile position={[x, i, z]} rotation={[0, 0, 0]} />
        )
    }

    const dir = Math.random() > 0.5 ? 1 : -1
    const rotationSpeed = Math.random() * 0.75 * dir
    
    useFrame((_, delta) => {
        ref.current.rotateY(delta * rotationSpeed)
    })

    return <group ref={ref}>{planes}</group>
}

const TileForest = () => {
    const forest = []

    for (let i = -60; i <= 60; i += 10) {
        forest.push(
            <TileStack x={i} z={i} />,
            <TileStack x={i} z={-i} />,
             <TileStack x={0} z={i} />,
            <TileStack x={i} z={0} />,
        )
    }

    return (
        <>{forest}</>
    )
}

const Lights = () => {
    const ref = useRef()
    return (
        <>
        <pointLight ref={ref} castShadow position={[0, 0, 0]} 
                args={[0xff00ff, 5, 100, 1]} />
            <hemisphereLight intensity={0.025} />
            </>
    )
}

const CameraMove = () => {
    useFrame((state) => {
      state.camera.position.x = 60 * Math.sin(0.1 * state.clock.getElapsedTime())
      state.camera.position.z = 60 * Math.cos(0.1 * state.clock.getElapsedTime())
      state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function Flux() {
    return (
        <BackgroundCanvas camera={{near: 5}}>
            <Lights />
            <color attach='background' args={['black']} />
            <TileForest />
            <CameraMove />
    </BackgroundCanvas>
    )
}