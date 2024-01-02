import React from 'react';
import S from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className={S.nav}>
            <ul>
                <li className={S.item}><NavLink to={'/profile'} activeClassName={S.active}>Profile</NavLink></li>
                <li className={S.item}><NavLink to={'/dialogs'} activeClassName={S.active}>Messages</NavLink></li>
                <li className={S.item}><NavLink to={'/news'} activeClassName={S.active}>News</NavLink></li>
                <li className={S.item}><NavLink to={'/music'} activeClassName={S.active}>Music</NavLink></li>
                <li className={S.item}><NavLink to={'/settings'} activeClassName={S.active}>Settings</NavLink></li>
            </ul>
        </nav>
    );
};

