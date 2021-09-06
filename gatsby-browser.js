import React from 'react'
import Layout from './src/components/Layout'
import { SceneProvider } from './src/components/SceneContext'
import { ThemeProvider } from './src/components/ThemeContext'

export const wrapRootElement = ({ element }) => (
	<ThemeProvider>
		<SceneProvider>{element}</SceneProvider>
	</ThemeProvider>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
