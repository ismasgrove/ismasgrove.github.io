import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
	EffectComposer,
	Noise,
	Bloom,
	Glitch,
} from '@react-three/postprocessing'
import BackgroundCanvas from '../components/BackgroundCanvas'

const Tile = ({ position, rotation }) => {
	const ref = useRef()
	const dir = Math.random() > 0.5 ? 1 : -1
	const rotationSpeed = Math.random() * dir
	const color = new THREE.Color().lerpColors(
		new THREE.Color('#0f0f0f'),
		new THREE.Color('#333'),
		Math.random()
	)
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

const TileStack = ({ x, z }) => {
	const ref = useRef()
	const planes = []
	for (let i = -50; i <= 50; i += 10) {
		planes.push(<Tile key={i} position={[x, i, z]} rotation={[0, 0, 0]} />)
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
			<TileStack key={[i, 0]} x={i} z={i} />,
			<TileStack key={[i, 1]} x={i} z={-i} />,
			<TileStack key={[i, 2]} x={0} z={i} />,
			<TileStack key={[i, 3]} x={i} z={0} />
		)
	}

	return <>{forest}</>
}

const Lights = () => {
	const ref = useRef()
	return (
		<>
			<pointLight
				ref={ref}
				position={[0, 0, 0]}
				args={[0xff00ff, 15, 100, 1]}
			/>
			<hemisphereLight intensity={0.045} />
		</>
	)
}

const CameraMove = () => {
	useFrame(state => {
		state.camera.position.x = 60 * Math.sin(0.1 * state.clock.getElapsedTime())
		state.camera.position.z = 60 * Math.cos(0.1 * state.clock.getElapsedTime())
		state.camera.lookAt(0, 0, 0)
	})
	return <></>
}

export default function Flux() {
	return (
		<BackgroundCanvas
			colorManagement
			gl={{ alpha: false }}
			camera={{ near: 5 }}
		>
			<Lights />
			<color attach='background' args={['black']} />
			<TileForest />
			{/* <hemisphereLight intensity={0.4} /> */}
			<CameraMove />
			<EffectComposer>
				<Bloom
					intensity={3}
					luminanceThreshold={0.0}
					luminanceSmoothing={0.9}
					height={720}
					width={720}
				/>
				<Glitch
					delay={[4, 5.5]}
					duration={[0.2, 0.4]}
					strength={[0.1, 0.3]}
					active
					ration={1}
				/>
				<Noise opacity={0.02} premultiply />
			</EffectComposer>
		</BackgroundCanvas>
	)
}
