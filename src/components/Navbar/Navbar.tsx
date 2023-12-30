import React from 'react';
import S from './Navbar.module.css';

export const Navbar = () => {
    return (
        <nav className={S.nav}>
            <ul>
                <li className={S.item}><a href={''}>Profile</a></li>
                <li className={S.item}><a href={''}>Messages</a></li>
                <li className={S.item}><a href={''}>News</a></li>
                <li className={S.item}><a href={''}>Music</a></li>
                <li className={S.item}><a href={''}>Settings</a></li>
            </ul>
        </nav>
    );
};