import React, {FC, useState} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {ActionTypes, RootStateType} from './redux/state';
import {Sidebar} from './components/Sidebar/Sidebar';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
// import {StoreContext} from './StoreContext';



export const App = () => {
    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <Sidebar />
                <div className={'content'}>
                    {/*<Routes>*/}
                    <Route path={'/profile'} component={Profile}/>
                    <Route path={'/dialogs'} component={DialogsContainer}/>


                    {/*<Route path={'/profile'}*/}
                    {/*       render={() => <Profile />}/> */}
                    {/*/!*render если передаем пропсы в компоненту Profile*!/*/}
                    {/*<Route path={'/dialogs'}*/}
                    {/*       render={() => <DialogsContainer />}/>*/}

                    {/*</Routes>*/}


                </div>
            </div>
    );
}