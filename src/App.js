import Logo from 'Components/Logo/logo';
import SearchBar from 'Components/SearchBar/searchBar';
import { useTheme } from 'Context/themeProvider';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Styles/global';
import { theme } from 'Styles/theme';
import ThemeToggle from 'Styles/themeToggle';

function App() {
	const [ThemeMode, toggleTheme] = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Logo />
			<SearchBar />
			<ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
				DarkMode
			</ThemeToggle>
		</ThemeProvider>
	);
}

export default App;
