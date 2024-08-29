import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Post {
	title: string
	body: string
	id: number
	userId: number
}

const PostDetail: React.FC = () => {
	const [post, setPost] = useState<Post>()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`/api/posts/${id}`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				setPost(await response.json())
				console.log(post)
			} catch (error) {
				setError(error instanceof Error ? error.message : 'Unknown error')
			} finally {
				setIsLoading(false)
			}
		}

		fetchPost()
	}, [id])

	return (
		<div>
			<h1>Post Detail</h1>
			<p>Viewing post with ID: {id}</p>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<>
					<h2>{post && post.title}</h2>
					<p>{post && post.body}</p>
				</>
			)}
		</div>
	)
}

export default PostDetail
