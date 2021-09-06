import React, { useContext, useState, useRef } from 'react'
import { navigate } from 'gatsby'
import tw from 'twin.macro'

import { SceneContext } from './SceneContext'
import { scenes } from './Scene'

const SceneMenu = props => {
	const { scene } = useContext(SceneContext)
	const ref = useRef()

	const [scrollable, setScrollable] = useState({
		left: false,
		right: true,
	})

	const onScroll = () => {
		let left, right
		if (ref.current.scrollLeft == 0) {
			left = false
		} else {
			left = true
		}
		if (
			ref.current.clientWidth ==
			ref.current.scrollWidth - ref.current.scrollLeft
		) {
			right = false
		} else {
			right = true
		}

		setScrollable({ left, right })
	}

	return (
		<div
			ref={ref}
			{...props}
			css={[
				tw`inline-flex overflow-y-hidden overflow-x-scroll
                lg:rounded-lg border-[var(--accents-color)] scrollbar-width[thin] scrollbar-color[var(--scrollable-color) var(--bg-color)] gap-4
                border-2 lg:border-l-8 lg:border-r-8 lg:border-t-0 lg:border-b-0
                `,
				scrollable['left'] && tw`border-l-[var(--scrollable-color)]`,
				scrollable['right'] && tw`border-r-[var(--scrollable-color)]`,
			]}
			onScroll={onScroll}
		>
			{Object.keys(scenes).map(sceneObj => (
				<div
					key={sceneObj}
					tw='min-w-max self-center cursor-pointer'
					onClick={() => {
						if (scenes[sceneObj] != scene) {
							navigate(scenes[sceneObj])
						}
					}}
				>
					<img
						css={[
							tw`w-[16rem] h-[8rem] self-center object-fill border-[1px] border-[var(--scrollable-color)]`,
							scenes[sceneObj] === scene && tw`border-[var(--accents-color)]`,
						]}
						src={`/${sceneObj.toLowerCase()}.jpg`}
						alt={sceneObj.toLowerCase()}
					/>
				</div>
			))}
		</div>
	)
}

export default function SceneSelector(props) {
	return <SceneMenu tw='prose font-mono z-10 bg-primary p-4' {...props} />
}
