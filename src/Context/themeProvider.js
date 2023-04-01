import { ThemeProvider as StyledProvider } from 'styled-components';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useCallback } from 'react';
import { darkTheme, lightTheme } from 'Styles/theme';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
	const LocalTheme = window.localStorage.getItem('theme') || 'light';
	// Provider로 넘길 context value 지정
	const [ThemeMode, setThemeMode] = useState(LocalTheme);
	const themeObject = ThemeMode === 'light' ? lightTheme : darkTheme;

	return (
		<ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
			<StyledProvider theme={themeObject}>{children}</StyledProvider>
		</ThemeContext.Provider>
	);
};

//custom hook -> 'light' 와 'dark' 테마 토글 기능 처리
function useTheme() {
	const context = useContext(ThemeContext);
	const { ThemeMode, setThemeMode } = context;

	const toggleTheme = useCallback(() => {
		if (ThemeMode === 'light') {
			setThemeMode('dark');
			window.localStorage.setItem('theme', 'dark');
		} else {
			setThemeMode('light');
			window.localStorage.setItem('theme', 'light');
		}
	}, [ThemeMode]);

	return [ThemeMode, toggleTheme];
}

export { ThemeProvider, useTheme };

export default ThemeProvider;
