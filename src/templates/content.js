import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import 'twin.macro'
import { Helmet } from 'react-helmet'

import { SceneContext } from '../components/SceneContext'
import { scenes } from '../components/Scene'
import { ThemeToggle } from '../components/ThemeToggle'

export default function Content({ data }) {
	const { setScene } = useContext(SceneContext)

	const post = data.markdownRemark
	const scene = data.markdownRemark.frontmatter.sceneCode

	useEffect(() => {
		if (scene) setScene(scenes[scene])
	})

	return (
		<>
			<Helmet>
				<meta charSet='utf8' />
				<title>{post.frontmatter.title}</title>
			</Helmet>

			<div tw='flex justify-between items-center pb-4 border-b border-color[var(--accents-color)]'>
				<h1>{post.frontmatter.title.toUpperCase()}</h1>
				<ThemeToggle
					key={new Date().getTime()}
					tw='mr-2 w-9 h-9 cursor-pointer font-size[0]'
				/>
			</div>

			<div tw='overflow-y-auto mt-2 pr-2'>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
			</div>
		</>
	)
}

export const query = graphql`
	query ($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				sceneCode
			}
		}
	}
`
