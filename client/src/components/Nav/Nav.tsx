import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const Nav: React.FC = () => {
	return (
		<nav
			className={`${styles.nav}`}
			role='navigation'
			aria-label='main navigation'
		>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/posts'>Posts</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
