import styled, { useTheme } from 'styled-components';

const Logo = () => {
	const ThemeMode = useTheme();

	return (
		<LogoWrapper theme={ThemeMode[0]}>
			{ThemeMode === 'light' ? (
				<img
					src="/Assets/search_mascot_light.png"
					style={{ width: '100px' }}
				></img>
			) : (
				<img
					src="/Assets/search_mascot_dark.png"
					style={{ width: '100px' }}
				></img>
			)}
		</LogoWrapper>
	);
};

export default Logo;

const LogoWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 50px;
`;
