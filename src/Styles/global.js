import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
        /* background-color: ${({ theme }) => theme.MODE.dark.bg}; */
        @font-face {
            font-family: 'Namsan';
            src: url('./Assets/Font/seoulNamsanB.ttf');
	    }
    }
`;
export default GlobalStyles;
