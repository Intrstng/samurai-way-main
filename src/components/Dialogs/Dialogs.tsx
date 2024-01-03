import React, {FC} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsItem, MessageItem} from '../../App';

type DialogsProps = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
}

export const Dialogs: FC<DialogsProps> = (props) => {
    const dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)

    const messagesElements = props.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)

    return (
        <>
            <h2>Dialogs</h2>

            <div className={S.dialogs}>
                <div className={S.dialogItems}>
                    {dialogsElements}
                </div>

                <div className={S.messages}>
                    {messagesElements}
                </div>
            </div>
        </>
    );
};