import LandingPage from 'Page';
import HomePage from 'Pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
		element: <HomePage />,
	},
]);

export default router;
