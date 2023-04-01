import { useTheme } from 'Context/themeProvider';
import { RouterProvider } from 'react-router-dom';
import router from 'Routes/routing';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Styles/global';
import { theme } from 'Styles/theme';
import ThemeToggle from 'Styles/themeToggle';

function App() {
	const [ThemeMode, toggleTheme] = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<RouterProvider router={router} />
			<ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
				DarkMode
			</ThemeToggle>
		</ThemeProvider>
	);
}

export default App;
