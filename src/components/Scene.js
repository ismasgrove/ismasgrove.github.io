import React, { useContext } from 'react'

import Flux from '../backgrounds/Flux'
import Crystal from '../backgrounds/Crystal'
import Spheres from '../backgrounds/Spheres'
import Boids from '../backgrounds/Boids'
import Landing from '../backgrounds/Landing'
import { SceneContext } from './SceneContext'
import { ThemeContext } from './ThemeContext'
import 'twin.macro'

export const scenes = {
	LANDING: '/',
	FLUX: '/flux',
	BOIDS: '/boids',
	SPHERES: '/spheres',
	CRYSTAL: '/crystal',
}

export default function Scene() {
	const { scene } = useContext(SceneContext)
	const { theme } = useContext(ThemeContext)
	return (
		<>
			{scene === scenes.LANDING && <Landing theme={theme} />}
			{scene === scenes.FLUX && <Flux />}
			{scene === scenes.BOIDS && <Boids />}
			{scene === scenes.SPHERES && <Spheres />}
			{scene === scenes.CRYSTAL && <Crystal />}
		</>
	)
}
