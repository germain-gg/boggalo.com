import React from 'react';
import ReactDOM from 'react-dom';

import { observer } from "mobx-react";

import { ThemeProvider } from "styled-components";

import { App as AppComponent } from './Component/App';
import { App as AppStore } from './Store/App';

import { GlobalStyle } from './Style/GlobalStyle';

import * as theme from "./Style/theme"

const Boggalo = observer(AppComponent);

const store = AppStore.create({});

ReactDOM.render(
	<>
		<GlobalStyle theme={theme} />
		<ThemeProvider theme={theme}>
			<Boggalo store={store} />
		</ThemeProvider>
	</>,
    document.getElementById('root')
);
