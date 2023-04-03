import Logo from 'Components/Logo/logo';
import SearchBar from 'Page/Components/SearchBar/searchBar';
import styled, { useTheme } from 'styled-components';

const LandingPage = () => {
	const theme = useTheme();
	// useTheme 사용하는 곳에서는 context가 아니라 styled-component에서 꺼내야함
	console.log('>>>>>>>', theme);
	const CurrentMode = theme.mode === 'light' ? '🌝' : '🌚';

	return (
		<>
			<Logo />
			<SearchBar />
			<Mode>{CurrentMode}</Mode>
		</>
	);
};

export default LandingPage;

const Mode = styled.div`
	right: 0;
`;
