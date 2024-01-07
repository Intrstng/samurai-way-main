import React, {FC, useState} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {ActionTypes, RootStateType} from './redux/state';
import {Sidebar} from './components/Sidebar/Sidebar';

type AppProps = {
    state: RootStateType
    dispatch: (action: ActionTypes) => void
}


export const App: FC<AppProps> = ({state, dispatch}) => {
    const {profilePage, dialogsPage, sidebar} = state;





    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <Sidebar friends={sidebar.friends}/>
            <div className={'content'}>
                {/*<Routes>*/}
                {/*<Route path={'/profile'} component={Profile}/>*/}
                {/*<Route path={'/dialogs'} component={Dialogs}/>*/}


                <Route path={'/profile'}
                       render={() => <Profile state={profilePage}
                                              dispatch={dispatch}/>}/>
                <Route path={'/dialogs'}
                       render={() => <Dialogs state={dialogsPage}
                                              dispatch={dispatch}/>}/>

                {/*</Routes>*/}


            </div>
        </div>
    );
}