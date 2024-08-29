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

export interface PostsContextValue {
	posts: Post[]
	isLoading: boolean
	error: string | null
	fetchMorePosts: () => void
}

const PostsContext = createContext<PostsContextValue | undefined>(undefined)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [rangeStart, setRangeStart] = useState<number>(1)
	const postsPerPage = 5

	const fetchMorePosts = async () => {
		try {
			const response = await fetch(
				`/api/posts/range/${rangeStart}:${rangeStart + postsPerPage}`
			)

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const newPosts = await response.json()
			setPosts((prevPosts) => [...prevPosts, ...newPosts])
			setRangeStart(rangeStart + postsPerPage)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Unknown error')
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchMorePosts()
	}, [])

	return (
		<PostsContext.Provider value={{ posts, isLoading, error, fetchMorePosts }}>
			{children}
		</PostsContext.Provider>
	)
}

export const usePosts = () => {
	const context = useContext(PostsContext)
	if (!context) {
		throw new Error('usePosts must be used within a PostsProvider')
	}
	return context
}
