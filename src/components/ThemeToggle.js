import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import sun from '../images/sun-svgrepo-com.svg'
import moon from '../images/moon-svgrepo-com.svg'

const ThemeToggle = props => {
	const { theme, setTheme } = useContext(ThemeContext)
	const isDark = () => theme === 'dark'
	const onClick = () => setTheme(isDark() ? 'light' : 'dark')
	const [src, setSrc] = useState(null)

	const dark = isDark()

	useEffect(() => {
		setSrc(dark ? sun : moon)
	}, [dark])

	return (
		<>
			{src && (
				<img
					{...props}
					alt={dark ? 'light mode' : 'dark mode'}
					src={src}
					onClick={onClick}
				/>
			)}
		</>
	)
}

export { ThemeToggle }
