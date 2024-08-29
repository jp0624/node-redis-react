import { useState, useEffect } from 'react'

const Home = () => {
	const [layout, setLayout] = useState<number>()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const localLayout = localStorage.getItem('layout')
		if (localLayout) {
			console.log('localLayout: ', localLayout)
			setLayout(+localLayout)
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
				setLayout(newLayout.layout)
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
					<h1>Layout: {layout} Home</h1>
				</>
			)}
		</div>
	)
}

export default Home
