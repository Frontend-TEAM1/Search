import { useTheme } from 'Context/themeProvider';
import { RouterProvider } from 'react-router-dom';
import router from 'Routes/routing';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Styles/global';
import { darkTheme, lightTheme } from 'Styles/theme';

function App() {
	const [themeMode, toggleTheme] = useTheme();
	const theme = themeMode === 'light' ? lightTheme : darkTheme; // 테마환경에 맞는 테마컬러

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<RouterProvider router={router} />
			<button
				title={theme === 'light' ? '라이트모드' : '다크모드'}
				onClick={toggleTheme}
			/>
		</ThemeProvider>
	);
}

export default App;
