import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Route } from 'react-router-dom';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { Footer } from './components/Footer/Footer';
import { SidebarContainer } from './components/Sidebar/SidebarContainer';
import { UsersContainer } from './components/Users/UsersContainer';
// import {StoreContext} from './StoreContext';



export const App = () => {
    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <SidebarContainer/>
                    <div className={'content'}>
                        {/*<Routes>*/}
                        {/*<Route path={'/profile'} component={Profile}/>*/}
                        {/*<Route path={'/dialogs'} component={DialogsContainer}/>*/}


                        <Route path={'/profile'}
                               render={() => <Profile />}/>
                        {/*render если передаем пропсы в компоненту Profile*/}
                        <Route path={'/dialogs'}
                               render={() => <DialogsContainer />}/>
                        <Route path={'/users'}
                             render={() => <UsersContainer />}/>

                        {/*</Routes>*/}
                    </div>
                <Footer/>
            </div>
    );
}