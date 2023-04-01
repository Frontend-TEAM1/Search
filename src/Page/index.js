import Logo from 'Components/Logo/logo';
import SearchBar from 'Page/Components/SearchBar/searchBar';
import { useTheme } from 'Context/themeProvider';

const LandingPage = () => {
	//다크모드
	const ThemeMode = useTheme();
	const CurrentMode = ThemeMode[0] === 'light' ? '🌝' : '🌚';

	return (
		<>
			<Logo />
			<SearchBar />
			{/* <span>{CurrentMode}</span> */}
		</>
	);
};

export default LandingPage;
