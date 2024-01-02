import React, {FC} from 'react';
import {v1} from 'uuid';
import S from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

// type DialogsProps = {
//     data: DialogsItem[]
// }

type DialogItemProps = {
    id: string
    name: string
}

// export type DialogsItem = {
//     id: string
//     name: string
// }

export const DialogItem: FC<DialogItemProps>= (props) => {
    const path = `/dialogs/${props.id}`;
    return (
        <div className={S.dialog}><NavLink to={path} activeClassName={S.active}>{props.name}</NavLink></div>
    )
}

type MessageProps = {
    message: string
}

export const Message: FC<MessageProps> = (props) => {
    return <p className={S.message}>{props.message}</p>
}

export const Dialogs = () => {
    // const data: DialogsItem[] = [{id: v1(), name: 'Tom'}, {id: v1(), name: 'Joe'}, {id: v1(), name: 'Ann'}, {id: v1(), name: 'Tim'}]
    return (
        <>
            <h2>Dialogs</h2>

            <div className={S.dialogs}>
                {/*<ul className={S.dialogItems}>*/}
                {/*    {*/}
                {/*        data.map((n, idx) => <li key={n.id} className={S.dialog}><NavLink to={`dialogs/${idx + 1}`} activeClassName={S.active}>{n.name}</NavLink></li>)*/}
                {/*    }*/}
                {/*</ul>*/}

                <div className={S.dialogItems}>
                    <DialogItem id={'1'} name={'Tim'}/>
                    <DialogItem id={'2'} name={'Tom'}/>
                    <DialogItem id={'3'} name={'Erika'}/>
                </div>

                <div className={S.messages}>
                    <Message message={'Hi!'}/>
                    <Message message={'How are you?'}/>
                    <Message message={'Nice to meet you!'}/>
                </div>
            </div>

        </>
    );
};