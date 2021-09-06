import React from 'react'
import Layout from './src/components/Layout'
import { ThemeProvider } from './src/components/ThemeContext'
import { SceneProvider } from './src/components/SceneContext'

export const wrapRootElement = ({ element }) => (
	<ThemeProvider>
		<SceneProvider>{element}</SceneProvider>
	</ThemeProvider>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
