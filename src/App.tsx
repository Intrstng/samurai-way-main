import React, {FC, useState} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {StateType} from './redux/state';
import {Sidebar} from './components/Sidebar/Sidebar';

type AppProps = {
    state: StateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}


export const App: FC<AppProps> = ({state, addPost, updateNewPostText}) => {
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
                                              addPost={addPost}
                                              updateNewPostText={updateNewPostText}/>}/>
                <Route path={'/dialogs'}
                       render={() => <Dialogs dialogs={dialogsPage.dialogs}
                                              messages={dialogsPage.messages}/>}/>

                {/*</Routes>*/}


            </div>
        </div>
    );
}