import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {MyPosts} from './components/Profile/MyPosts/MyPosts';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {v1} from 'uuid';


const App = () => {

  return (
    <div className={'app-wrapper'}>
        <Header />
        <Navbar />
        <div className={'content'}>
        {/*<Routes>*/}
            <Route path={'/profile'} component={Profile}/>
            <Route path={'/dialogs'} component={Dialogs}/>

        {/*</Routes>*/}




        </div>
    </div>
  );
}

export default App;