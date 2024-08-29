import Posts from './pages/Posts/Posts'
import Home from './pages/Home/Home'
import PostDetail from './pages/PostDetail/PostDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav/Nav'

function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/posts' element={<Posts />} />
				<Route path='/posts/:id' element={<PostDetail />} />
			</Routes>
		</Router>
	)
}

export default App
