import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		${({ theme }) => css`
			font-family: ${theme.fontFamily};
			font-size: ${theme.fontSize};
			background: ${theme.background};
			color: ${theme.mainTextColour};
		`}
	}
`;
