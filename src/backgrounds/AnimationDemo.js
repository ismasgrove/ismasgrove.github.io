import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree, PerspectiveCamera, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { paletteLerpRGB } from '../utils/gfx_utils'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const AnimatedModel = ({ path, scale, ...props }) => {
    const model = useLoader(GLTFLoader, path)

    let mixer
    if (model.animations.length) {
        mixer = new THREE.AnimationMixer(model.scene)
        const action = mixer.clipAction(model.animations[0])
        action.play()
    }

    model.scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })

    useFrame((_, delta) => {
        mixer?.update(delta)
    })

    return <primitive object={model.scene} scale={scale} {...props}/>

}

const Birds = ({ path, scale, ...props }) => {
    const model = useLoader(FBXLoader, path)

    let mixers = []
    const children = [...model.children]

    for (const child of model.children) {
        if (child.isGroup) {
            child.position.setY(Math.random() * 2 - 1)
        }
    }


    if (model.animations.length) {
        for (const child of children) {
            if (child.isGroup) {
                let mixer = new THREE.AnimationMixer(child)
                let action = mixer.clipAction(model.animations[0])
                action.startAt(Math.random() * 0.3)
                action.play()
                mixers.push(mixer)
            }
        }
    }
    
    useFrame((_, delta) => {
        for (const mixer of mixers) {
            mixer?.update(delta)
        }
    })

    return <primitive object={model} scale={scale} {...props}/>
}

export default function AnimationDemo() {
    const orb = React.useRef()
    return (
        <Canvas camera={{ position: [0, 0, 4] }}>
            <color attach='background' args={['lightblue']} />
            <hemisphereLight intensity={0.35} />
            <Suspense fallback={null}>
                <AnimatedModel path='/CesiumMan.glb' position={[0, 0, 1.15]} />
                <AnimatedModel path='/hmm2.glb' position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[9, 9, 9]} />
            </Suspense>
            <OrbitControls ref={orb} />
        </Canvas>
    )
}

/*
    
                <Birds path='/bird.fbx' scale={[0.1, 0.1, 0.1]}
                    rotation={[0, Math.PI, 0]}/>
*/