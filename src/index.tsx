import React from 'react';
import './index.css';
import {RootStateType} from './redux/state';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {AppRootStateType, store} from './redux/redux-store';
import { StoreContext } from './StoreContext';


export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
            <App />
            </StoreContext.Provider>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());

// store.subscribe(rerenderEntireTree);

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});