import LandingPage from 'Page';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
]);

export default router;
