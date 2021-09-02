import React from 'react'
import Layout from './src/components/Layout'
import { SceneProvider } from './src/components/SceneContext'
import { ThemeProvider } from './src/components/ThemeContext'

export const wrapRootElement = ({ element }) => (
    <SceneProvider><ThemeProvider>{element}</ThemeProvider></SceneProvider>
)

export const wrapPageElement = ({ element }) => (
        <Layout>
            {element}
        </Layout>
)
