import React, {ChangeEvent, FC, useRef} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {ActionTypes, DialogsItem, MessageItem} from '../../redux/state';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';

type DialogsProps = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
    newMessageBody: string
    onNewMessageChange: (value: string) => void
    onClickSendMessage: () => void
}

export const Dialogs: FC<DialogsProps> = ({dialogs,
                                           messages,
                                           newMessageBody,
                                           onNewMessageChange,
                                           onClickSendMessage}) => {


    const dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} src={d.src}/>);

    const messagesElements = messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);


    const onChangeHandlerNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onNewMessageChange(e.currentTarget.value);
    }

    const onClickHandlerSendMessage = () => {
        onClickSendMessage();
    };

    return (
        <div className={S.dialogs}>
            <h2>Dialogs</h2>

            <div className={S.wrapper}>
                <div className={S.dialogItems}>
                    {dialogsElements}
                </div>
                <div className={S.messages}>
                    {messagesElements}
                    <div>
                        <textarea value={newMessageBody} id="sendMessage" name="sendMessage" placeholder="Write a message..." onChange={onChangeHandlerNewMessage}></textarea>
                        <button onClick={onClickHandlerSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};