import React, {FC, useRef} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsItem, MessageItem} from '../../redux/state';

type DialogsProps = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
}

export const Dialogs: FC<DialogsProps> = ({dialogs, messages}) => {
    const dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} src={d.src}/>);

    const messagesElements = messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    const inputMessageRef = useRef<HTMLTextAreaElement>(null);
    const onClickAddMessage = () => {};
    return (
        <div className={S.dialogs}>
            <h2>Dialogs</h2>

            <div className={S.wrapper}>
                <div className={S.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={S.messages}>
                    {messagesElements}
                    <textarea ref={inputMessageRef} id="sendMessage" name="sendMessage" placeholder="Write a message..."></textarea>
                    <button onClick={onClickAddMessage}>Send</button>
                </div>

            </div>
        </div>
    );
};