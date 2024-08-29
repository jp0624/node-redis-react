import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from 'react'

export interface Post {
	title: string
	body: string
}

export interface LayoutContextValue {
	layout: number
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined)

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [layout, setLayout] = useState(1)

	useEffect(() => {
		const selectLayout = async () => {
			try {
				const response = await fetch(`/api/layout`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const newLayout = await response.json()
				setLayout(newLayout.layout)
			} catch (error) {
				console.log(error instanceof Error ? error.message : 'Unknown error')
			}
		}

		selectLayout()
	}, [])

	return (
		<LayoutContext.Provider value={{ layout }}>
			{children}
		</LayoutContext.Provider>
	)
}

export const useLayout = () => {
	const context = useContext(LayoutContext)
	console.log('context: ', context)
	if (!context) {
		throw new Error('usePosts must be used within a LayoutProvider')
	}
	return context
}
