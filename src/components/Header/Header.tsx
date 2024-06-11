import React, { FC } from 'react';
import S from './Header.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthStateType } from '../../redux/auth-reducer';
import { HeaderAuthProps } from './HeaderContainer';
import defaultAuthedUsersAvatar from '../../assets/images/Authorized_default_avatar_user.png';

export const Header: FC<HeaderAuthProps> = (props) => {

    const authedUserInfo = <div className={S.loggedUsersInfo}>
                                <img src={props.avatar ? props.avatar
                                                       : defaultAuthedUsersAvatar} alt={'User`s avatar'}/>
                           </div>


    return (
        <header className={S.header}>
            <img width="58" height="58"
                 src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/external-social-network-social-media-sbts2018-outline-sbts2018.png"
                 alt="external-social-network-social-media-sbts2018-outline-sbts2018"/>
            <div className={S.loginBlock}>
                {props.isAuth ? <div className={S.loggedUsersInfo}>
                                    {authedUserInfo}
                                    <span className={S.loginName}>{props.login}</span>
                                </div>
                              : <NavLink to={'/login'} activeClassName={S.active}>Login</NavLink>}
            </div>
        </header>
    );
};