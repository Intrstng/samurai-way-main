import React, { FC } from 'react';
import S from './Header.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthStateType } from '../../redux/auth-reducer';
import { HeaderAuthProps } from './HeaderContainer';

export const Header: FC<HeaderAuthProps> = (props) => {


    return (
        <header className={S.header}>
            <img width="58" height="58" src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/external-social-network-social-media-sbts2018-outline-sbts2018.png" alt="external-social-network-social-media-sbts2018-outline-sbts2018"/>
          <div className={S.loginBlock}>
            { props.isAuth ? <span className={S.loginName}>{props.login}</span>
                           : <NavLink to={'/login'} activeClassName={S.active}>Login</NavLink> }
          </div>
        </header>
    );
};