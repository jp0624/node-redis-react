import React from 'react'
import { usePosts } from '../../data/PostsData/PostsDataContext.tsx'
import { Link } from 'react-router-dom'

interface Post {
	title: string
	body: string
}
const Posts: React.FC = () => {
	const { posts, isLoading, error, fetchMorePosts } = usePosts()

	const loadMorePosts = () => {
		fetchMorePosts() // fetchPosts
		console.log('Posts: ', posts)
	}
	return (
		<div>
			<h2>Posts:</h2>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<ul>
					{posts.map((post: Post, index) => (
						<li key={index + 1}>
							<Link to={`/posts/${index + 1}`}>
								<h3>
									{index + 1} {post.title}
								</h3>
							</Link>
							<p>{post.body}</p>
						</li>
					))}
				</ul>
			)}
			<button onClick={loadMorePosts}>Load More Posts</button>
		</div>
	)
}

export default Posts
