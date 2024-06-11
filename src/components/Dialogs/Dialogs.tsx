import React, {ChangeEvent, FC} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsItem, MessageItem} from '../../redux/state';
import { DialogsPropsType } from './DialogsContainer';
import { Redirect } from 'react-router-dom';

// type DialogsProps = {
//     dialogs: DialogsItem[]
//     messages: MessageItem[]
//     newMessageBody: string
//     onNewMessageChange: (value: string) => void
//     onClickSendMessage: () => void
// }

export const Dialogs: FC<DialogsPropsType> = ({dialogs,
                                           messages,
                                           newMessageBody,
                                           isCurrentUserAuthorized,
                                           ...props}) => {


    const dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} src={d.src}/>);

    const messagesElements = messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);


    const onChangeHandlerNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onNewMessageChange(e.currentTarget.value);
    }

    const onClickHandlerSendMessage = () => {
        props.onClickSendMessage();
    };

    if (!isCurrentUserAuthorized) {
        return <Redirect to={'/login'}/>
    }

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