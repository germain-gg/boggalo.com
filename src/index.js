import React from 'react';
import ReactDOM from 'react-dom';

import { observer } from "mobx-react";

import './Style/global.css';

import { App as AppComponent } from './Component/App';
import { App as AppStore } from './Store/App';

const Boggalo = observer(AppComponent);

const store = AppStore.create({
    word: "zugzwangs"
});

ReactDOM.render(
    <Boggalo store={store} />,
    document.getElementById('root')
);