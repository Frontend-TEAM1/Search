import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    body{
        box-sizing: border-box;
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        @font-face {
            font-family: 'Namsan';
            src: url('./Assets/Font/seoulNamsanB.ttf');
	    }
    }
`;
export default GlobalStyles;
