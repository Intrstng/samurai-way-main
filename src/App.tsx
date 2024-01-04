import React, {FC} from 'react';
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
}


export const App: FC<AppProps> = ({state}) => {
    const {profilePage, dialogsPage, sidebar} = state

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <Sidebar friends={sidebar.friends}/>
                <div className={'content'}>
                    {/*<Routes>*/}
                    {/*<Route path={'/profile'} component={Profile}/>*/}
                    {/*<Route path={'/dialogs'} component={Dialogs}/>*/}


                    <Route path={'/profile'}
                           render={() => <Profile posts={profilePage.post}/>}/>
                    <Route path={'/dialogs'}
                           render={() => <Dialogs dialogs={dialogsPage.dialogs}
                                                  messages={dialogsPage.messages}/>}/>

                    {/*</Routes>*/}


                </div>
            </div>
        </BrowserRouter>
    );
}