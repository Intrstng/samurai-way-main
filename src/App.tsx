import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {v1} from 'uuid';

export type PostItem = {
    id: string
    message: string
    likesCount: number
}

export type DialogsItem = {
    id: string
    name: string
}

export type MessageItem = {
    id: string
    message: string
}

export const App = () => {
    const post: PostItem[] = [
        {id: v1(), message: 'Post 1', likesCount: 14},
        {id: v1(), message: 'Post 2', likesCount: 11},
        {id: v1(), message: 'Post 3', likesCount: 17},
        {id: v1(), message: 'Post 4', likesCount: 9}
    ]
    const dialogs: DialogsItem[] = [
        {id: v1(), name: 'Tom'},
        {id: v1(), name: 'Joe'},
        {id: v1(), name: 'Ann'},
        {id: v1(), name: 'Tim'}
    ]
    const messages: MessageItem[] = [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'It`s awesome!'},
        {id: v1(), message: 'Nice to meet you!'}
    ]
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'content'}>
                    {/*<Routes>*/}
                    {/*<Route path={'/profile'} component={Profile}/>*/}
                    {/*<Route path={'/dialogs'} component={Dialogs}/>*/}


                    <Route path={'/profile'} render={() => <Profile posts={post}/>}/>
                    <Route path={'/dialogs'} render={() => <Dialogs dialogs={dialogs} messages={messages}/>}/>

                    {/*</Routes>*/}


                </div>
            </div>
        </BrowserRouter>
    );
}