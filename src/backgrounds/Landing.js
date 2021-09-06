import React, { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useTexture, shaderMaterial } from '@react-three/drei'
import { useControls } from 'leva'

import frag from './shaders/home/frag.glsl'
import vert from './shaders/home/vertex.glsl'
import BackgroundCanvas from '../components/BackgroundCanvas'

const PlaneMaterial = shaderMaterial(
	{
		time: 0,
		uTexture: new THREE.Texture(),
		thickness: 0,
		softness: 1,
		color: new THREE.Color(),
		outline_color: new THREE.Color(),
		outline_softness: 0.5,
		outline_thickness: 0.5,
	},
	vert,
	frag
)

extend({ PlaneMaterial })

const SDFPlane = ({ theme }) => {
	const {
		thickness,
		softness,
		outlineThickness,
		outlineSoftness,
		color,
		outlineColor,
	} = useControls({
		thickness: {
			value: 0.6,
			min: 0,
			max: 1,
			step: 0.05,
		},
		softness: {
			value: 0.3,
			min: 0,
			max: 1,
			step: 0.05,
		},
		outlineThickness: {
			value: 0.45,
			min: 0,
			max: 1,
			step: 0.05,
		},
		outlineSoftness: {
			value: 0,
			min: 0,
			max: 1,
			step: 0.05,
		},
		color: theme === 'dark' ? '#000' : '#fff',
		outlineColor: theme === 'dark' ? '#bf0059' : '#dbab18',
	})
	const texture = useTexture('/home_sdf.png')
	const ref = useRef()
	useFrame(({ clock }) => {
		ref.current.uniforms.time.value = clock.getElapsedTime()
	})
	return (
		<mesh receiveShadow position={[0, 0, -2]}>
			<planeBufferGeometry attach='geometry' args={[10, 10, 1]} />
			<planeMaterial
				transparent
				ref={ref}
				attach='material'
				time={0}
				thickness={thickness}
				softness={softness}
				outline_thickness={outlineThickness}
				outline_softness={outlineSoftness}
				color={color}
				outline_color={outlineColor}
				uTexture={texture}
			/>
		</mesh>
	)
}

const PlaneBack = () => {
	return (
		<mesh receiveShadow position={[0, 0, -2.2]}>
			<planeBufferGeometry attach='geometry' args={[30, 20, 1]} />
			<meshPhongMaterial attach='material' color='#222' />
		</mesh>
	)
}

const CameraMove = ({ zoom }) => {
	useFrame(state => {
		if (zoom === true) {
			state.camera.position.set(
				Math.sin(state.clock.getElapsedTime() * 0.3) * 3,
				0.175,
				-1.4
			)
			state.camera.lookAt(
				Math.sin(state.clock.getElapsedTime() * 0.3) * 3,
				0.175,
				-2
			)
		} else {
			state.camera.position.set(-1.75, 0, 2)
			state.camera.lookAt(-1.75, 0, 0)
		}
	})
	return null
}

export default function Landing({ theme }) {
	const { zoom } = useControls({
		zoom: false,
	})
	return (
		<BackgroundCanvas
			shadows
			colorManagement
			gl={{ alpha: false }}
			camera={{ position: [-1.75, 0, 2], near: 0.01 }}
		>
			<ambientLight />
			<Suspense fallback={null}>
				<SDFPlane theme={theme} />
			</Suspense>
			<PlaneBack />
			<CameraMove zoom={zoom} />
			<spotLight
				args={[0x000099, 0.5, 30, Math.PI * 0.35, 0.25, 1]}
				position={[0, 0, 20]}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={1}
				shadow-camera-far={30}
			/>
			{/* <OrbitControls /> */}
		</BackgroundCanvas>
	)
}
