import React, {ChangeEvent, FC, useRef} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {ActionTypes, DialogsItem, MessageItem} from '../../redux/state';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';

type DialogsProps = {
    state: {
        dialogs: DialogsItem[]
        messages: MessageItem[]
        newMessageBody: string
    }
    dispatch: (action: ActionTypes) => void
}

export const Dialogs: FC<DialogsProps> = ({state, dispatch}) => {
    const {dialogs, messages, newMessageBody} = state;
    const dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} src={d.src}/>);

    const messagesElements = messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);


    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewMessageBodyAC(e.currentTarget.value));
    }

    const onClickSendMessage = () => {
        dispatch(sendMessageAC());
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
                        <textarea value={newMessageBody} id="sendMessage" name="sendMessage" placeholder="Write a message..." onChange={onNewMessageChange}></textarea>
                        <button onClick={onClickSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};