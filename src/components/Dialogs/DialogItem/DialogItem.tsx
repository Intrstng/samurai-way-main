import React, {FC} from 'react';
import S from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    id: string
    name: string
    src: string
}
export const DialogItem: FC<DialogItemProps>= (props) => {
    const path = `/dialogs/${props.name}`;
    return (
        <div className={S.dialog}>
            <img src={props.src} alt={'user-avatar'}/>
            <NavLink to={path} activeClassName={S.active}>{props.name}</NavLink>
        </div>

    )
}