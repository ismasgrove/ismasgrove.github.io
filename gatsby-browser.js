import React from 'react'
import Layout from './src/components/Layout'
import { ThemeProvider } from './src/components/themeContext'


export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element}</ThemeProvider>
)

export const wrapPageElement = ({ element }) => {
    return (
        <Layout>
            {element}
        </Layout>
    )
}
