import styled from 'styled-components';

const Logo = () => {
	return (
		<LogoWrapper>
			<img
				src="/Assets/search_mascot_light.png"
				style={{ width: '100px' }}
			></img>
		</LogoWrapper>
	);
};

export default Logo;

const LogoWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 150px;
`;
