import React, { useContext } from 'react'
import { GlobalStyles } from 'twin.macro'

import StylesBase from './StylesBase'
import Scene from './Scene'
import PostContainer from './PostContainer'
import Footer from './Footer'
import Navbar from './Navbar'
import SceneSelector from './SceneSelector'

const footerInfo = '2021 ©'

const Template = ({ children }) => {
	return (
		<div
			tw='
    flex flex-col
    overflow-y-auto overflow-x-hidden
    lg:grid

    lg:grid-template-columns[
      [start] 0.5fr
      [footer-post-gap] 0.1fr
      [footer] 0.6fr
      [post] 3fr
      [post-scene-gap] minmax(0, 3fr)
      [scene] 1.5fr
      [nav] 1.5fr
      [scene-end] 0.75fr
      [end] 0.5fr
    ]
    2xl:grid-template-columns[
      [start] 0.75fr
      [footer-post-gap] 0.1fr
      [footer] 0.4fr
      [post] 1.75fr
      [post-scene-gap] minmax(0, 3fr)
      [scene] 1.5fr
      [nav] 0.75fr
      [scene-end] 0.75fr
      [end] 0.75fr
    ]
    lg:grid-template-rows[
      [nav] 0.25fr
      [nav-post-gap] 1fr
      [post] minmax(0, 3fr)
      [post-scene-gap] 0.3fr
      [scene] 1fr
      [scene-footer-gap] 0.3fr
      [footer] 0.2fr
    ]
      
    lg:overflow-hidden h-screen'
		>
			{children}
		</div>
	)
}

const Layout = ({ children }) => {
	return (
		<Template>
			<GlobalStyles />
			<StylesBase />
			<Scene tw='lg:col-start-1 lg:col-auto lg:row-start-1 lg:row-auto' />
			<Navbar tw='min-w-full lg:col-start-7 lg:col-span-1 lg:row-start-1 lg:row-end-1 shadow' />
			<PostContainer tw='min-h-[40%] overflow-y-auto lg:col-start-2 lg:col-span-3 lg:row-start-3 lg:row-end-3 shadow-2xl'>
				{children}
			</PostContainer>
			<SceneSelector tw='min-w-full flex-shrink-0 lg:flex-auto lg:col-start-6 lg:col-span-3 lg:row-start-5 lg:row-end-5 z-10 shadow-2xl' />
			<Footer tw='min-w-full lg:col-start-3 lg:col-span-1 lg:row-start-7 lg:row-end-7 lg:text-center shadow-2xl'>
				{footerInfo}
			</Footer>
		</Template>
	)
}

export default Layout
