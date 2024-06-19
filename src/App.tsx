import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/Profile';
import { Route, Switch } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Footer } from './components/Footer/Footer';
import { SidebarContainer } from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { LoginPage } from './components/LoginPage/LoginPage';


export const App = () => {
    return (
            <div className={'app-wrapper'}>
                <HeaderContainer />
                <Navbar/>
                <SidebarContainer/>
                    <div className={'content'}>
                        <Switch>
                        <Route path={'/login'} component={LoginPage}/>
                        <Route path={'/profile/:userId?'}
                               render={() => <ProfileContainer />}/>
                        {/*render если передаем пропсы в компоненту Profile*/}
                        <Route path={'/dialogs'}
                               render={() => <DialogsContainer />}/>
                        <Route path={'/users'}
                             render={() => <UsersContainer />}/>

                        </Switch>
                    </div>
                <Footer/>
            </div>
    );
}