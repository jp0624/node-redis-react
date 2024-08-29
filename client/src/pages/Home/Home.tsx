import { useState, useEffect } from 'react'
import { useLayout } from '../../data/SelectLayout/SelectLayoutContext'

const Home = () => {
	const { layout } = useLayout()
	const [newLayout, setNewLayout] = useState<number>()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const localLayout = localStorage.getItem('layout')
		if (localLayout) {
			console.log('localLayout: ', localLayout)
			setNewLayout(+localLayout)
			return setIsLoading(false)
		}
		const fetchLayout = async () => {
			try {
				const response = await fetch(`/api/layout`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const newLayout = await response.json()
				localStorage.setItem('layout', newLayout.layout)
				setNewLayout(newLayout.layout)
				console.log('newLayout: ', newLayout)
			} catch (error) {
				setError(error instanceof Error ? error.message : 'Unknown error')
			} finally {
				setIsLoading(false)
			}
		}

		fetchLayout()
	}, [])
	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<>
					<h1>Home</h1>
					<h2>LocalStorage Layout: {newLayout} </h2>
					<h2>Context Layout: {layout}</h2>
				</>
			)}
		</div>
	)
}

export default Home
