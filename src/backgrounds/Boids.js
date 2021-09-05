import React, { Suspense } from 'react'
import { Vector3, Quaternion, Matrix4, DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'

import BackgroundCanvas from '../components/BackgroundCanvas'
import Bird from '../gltfjsx/Bird'

const Boids = ({
	flockSize,
	separVal,
	alignVal,
	cohesVal,
	windVal,
	bounds,
	spawnRange,
}) => {
	const applyForce = (bird, force) => {
		bird.acceleration.add(force)
	}

	const render = (bird, t) => {
		bird.velocity.multiplyScalar(t)
		const rotationMatrix = new Matrix4()
		const quat = new Quaternion()
		const target = new Vector3().addVectors(bird.position, bird.velocity)
		rotationMatrix.lookAt(bird.position, target, bird.up)
		quat.setFromRotationMatrix(rotationMatrix)
		bird.quaternion.rotateTowards(quat, bird.velocity.lengthSq())
		bird.position.add(bird.velocity)
	}

	const edgeCheck = bird => {
		const skyboxSize = bounds / 2

		if (bird.position.x < -skyboxSize) {
			bird.position.x = skyboxSize
		}
		if (bird.position.x > skyboxSize) {
			bird.position.x = -skyboxSize
		}
		if (bird.position.y < -skyboxSize) {
			bird.position.y = skyboxSize
		}
		if (bird.position.y > skyboxSize) {
			bird.position.y = -skyboxSize
		}
		if (bird.position.z < -skyboxSize) {
			bird.position.z = skyboxSize
		}

		if (bird.position.z > skyboxSize) {
			bird.position.z = -skyboxSize
		}
	}

	const update = (ref, t) => {
		const curr = ref.current

		//flocking
		const align = alignment(curr, flockRefs)
		const cohes = cohesion(curr, flockRefs)
		const separ = separation(curr, flockRefs)
		const wind = new Vector3(windVal, 0, 0)
		align.multiplyScalar(alignVal)
		cohes.multiplyScalar(cohesVal)
		separ.multiplyScalar(separVal)
		applyForce(curr, align)
		applyForce(curr, cohes)
		applyForce(curr, separ)
		applyForce(curr, wind)

		//update
		curr.velocity.add(curr.acceleration)
		curr.velocity.clampLength(Number.NEGATIVE_INFINITY, curr.maxspeed)

		//skybox edges
		edgeCheck(curr)

		//render
		render(curr, t)
	}

	const separation = (bird, flockRefs) => {
		const desiredseparation = 25
		const steer = new Vector3()
		let count = 0
		for (const neighbor of flockRefs) {
			const dist = bird.position.distanceTo(neighbor.current.position)
			if (dist > 0 && dist < desiredseparation) {
				const diff = new Vector3().subVectors(
					bird.position,
					neighbor.current.position
				)
				diff.divideScalar(dist)
				steer.add(diff)
				count++
			}
		}
		if (count > 0) {
			steer.divideScalar(count)
		}

		if (steer.length() > 0) {
			steer.normalize()
			steer.multiplyScalar(bird.maxspeed)
			steer.sub(bird.velocity)
			steer.clampLength(Number.NEGATIVE_INFINITY, bird.maxforce)
		}

		return steer
	}

	const cohesion = (bird, flockRefs) => {
		const neighbordist = 50
		const sum = new Vector3(0, 0, 0)
		let count = 0
		for (const neighbor of flockRefs) {
			const dist = bird.position.distanceTo(neighbor.current.position)
			if (dist > 0 && dist < neighbordist) {
				sum.add(neighbor.current.velocity)
				count++
			}
		}
		if (count > 0) {
			sum.divideScalar(count)
			return seek(bird, sum)
		} else {
			return new Vector3(0)
		}
	}

	const alignment = (bird, flockRefs) => {
		const neighbordist = 50
		const sum = new Vector3(0, 0, 0)
		let count = 0
		for (const neighbor of flockRefs) {
			const dist = bird.position.distanceTo(neighbor.current.position)
			if (dist > 0 && dist < neighbordist) {
				sum.add(neighbor.current.velocity)
				count++
			}
		}
		if (count > 0) {
			sum.divideScalar(count)
			sum.normalize()
			sum.multiplyScalar(bird.maxspeed)
			const steer = sum.sub(bird.velocity)
			steer.clampLength(Number.NEGATIVE_INFINITY, bird.maxforce)
			return steer
		} else {
			return new Vector3(0)
		}
	}

	const seek = (bird, target) => {
		const desired = target.sub(bird.position)
		desired.normalize()
		desired.multiplyScalar(bird.maxspeed)
		const steer = desired.sub(bird.velocity)
		steer.clampLength(Number.NEGATIVE_INFINITY, bird.maxforce)
		return steer
	}

	const flock = []
	const flockRefs = []

	for (let i = 0; i < flockSize; i++) {
		const ref = React.useRef()
		flock.push(
			<Bird
				key={i}
				ref={ref}
				scale={[9, 9, 9]}
				position={[
					Math.random() * spawnRange * 2 - spawnRange,
					Math.random() * spawnRange * 2 - spawnRange,
					Math.random() * spawnRange * 2 - spawnRange,
				]}
				velocity={
					new Vector3(
						Math.random() * 2 - 1,
						Math.random() * 2 - 1,
						Math.random() * 2 - 1
					)
				}
				acceleration={new Vector3()}
				maxspeed={4}
				maxforce={1}
			/>
		)
		flockRefs.push(ref)
	}

	useFrame((_, delta) => {
		for (const ref of flockRefs) {
			update(ref, delta)
		}
	})

	return <group>{flock}</group>
}

const Boundary = ({ bounds }) => {
	return (
		<mesh>
			<boxBufferGeometry
				args={[bounds, bounds, bounds, 1, 1]}
				attach='geometry'
			/>
			<meshStandardMaterial
				transparent
				side={DoubleSide}
				opacity={0.1}
				color='white'
				attach='material'
			/>
		</mesh>
	)
}

export default function AnimationDemo() {
	const boidProps = useControls({
		flockSize: {
			value: 200,
			min: 100,
			max: 500,
			step: 1,
		},
		separVal: {
			value: 1.5,
			min: 0,
			max: 10,
			step: 0.25,
		},
		alignVal: {
			value: 1.5,
			min: 0,
			max: 10,
			step: 0.25,
		},
		cohesVal: {
			value: 1.5,
			min: 0,
			max: 10,
			step: 0.25,
		},
		windVal: {
			value: 1.5,
			min: -10,
			max: 10,
			step: 0.25,
		},
		bounds: {
			value: 200,
			min: 100,
			max: 500,
			step: 50,
		},
		spawnRange: {
			value: 50,
			min: 10,
			max: 500,
			step: 25,
		},
	})

	return (
		<BackgroundCanvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 50] }}>
			<color attach='background' args={['lightblue']} />
			<hemisphereLight intensity={0.35} />
			<Suspense fallback={null}>
				<Boids key={boidProps.flockSize} {...boidProps} />
				<Environment background preset='dawn' />
			</Suspense>
			<Boundary bounds={boidProps.bounds} />
			<OrbitControls />
		</BackgroundCanvas>
	)
}
