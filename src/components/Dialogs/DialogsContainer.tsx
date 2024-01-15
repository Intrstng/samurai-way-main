import React, {ChangeEvent, FC, useRef} from 'react';
import S from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {ActionTypes, DialogsItem, MessageItem} from '../../redux/state';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import { StoreContext } from '../../StoreContext';



export const DialogsContainer = () => {
    return  (
        <StoreContext.Consumer>
            { // фигурные скобки <StoreContext.Consumer> на новой строке
                (store: any) => {
                    let state = store.getState().dialogsPage;

                    const onNewMessageChange = (value: string) => {
                        store.dispatch(updateNewMessageBodyAC(value));
                    }

                    const onClickSendMessage = () => {
                        store.dispatch(sendMessageAC());
                    };

                    return <Dialogs dialogs={state.dialogs}
                                    messages={state.messages}
                                    newMessageBody={state.newMessageBody}
                                    onNewMessageChange={onNewMessageChange}
                                    onClickSendMessage={onClickSendMessage}/>;
                }
            }
            </StoreContext.Consumer>
        )
};