import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostsProvider } from './data/PostsData/PostsDataContext.tsx'
import { LayoutProvider } from './data/SelectLayout/SelectLayoutContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<PostsProvider>
		<LayoutProvider>
			<App />
		</LayoutProvider>
	</PostsProvider>
)
