import styled, { useTheme } from 'styled-components';

const Logo = () => {
	const theme = useTheme();
	// useTheme 사용하는 곳에서는 context가 아니라 styled-component에서 꺼내야함
	console.log(theme);
	return (
		<LogoWrapper theme={theme}>
			{theme.mode === 'light' ? (
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
