// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main';
import PostDetail from './post-detail';

const Router = () => {
	return (
		<BrowserRouter basename="/react-infinite-scroll">
			<Routes>
				<Route path="" element={<Main />} />
				<Route path=":postId" element={<PostDetail />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
