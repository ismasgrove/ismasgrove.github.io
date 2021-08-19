import React from 'react'
import Layout from './src/components/Layout'
import { ThemeProvider } from './src/components/ThemeContext'
import { SceneProvider } from './src/components/SceneContext'

export const wrapRootElement = ({ element }) => (
    <SceneProvider><ThemeProvider>{element}</ThemeProvider></SceneProvider>
)

export const wrapPageElement = ({ element }) => {
        <Layout>{element}</Layout>
}