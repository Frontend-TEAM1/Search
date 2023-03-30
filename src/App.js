import Logo from 'Components/Logo/logo';
import SearchBar from 'Components/SearchBar/searchBar';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Styles/global';
import theme from 'Styles/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Logo />
			<SearchBar />
		</ThemeProvider>
	);
}

export default App;
