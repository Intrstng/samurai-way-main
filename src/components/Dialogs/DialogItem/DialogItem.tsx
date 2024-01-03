import React, {FC} from 'react';
import S from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    id: string
    name: string
}
export const DialogItem: FC<DialogItemProps>= (props) => {
    const path = `/dialogs/${props.name}`;
    return (
        <div className={S.dialog}><NavLink to={path} activeClassName={S.active}>{props.name}</NavLink></div>
    )
}