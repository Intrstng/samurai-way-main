import React from 'react';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {
    connect
} from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import { AppDispatch, DialogsItem, MessageItem } from '../../redux/state';

type DialogsMapStateToPropsType = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
    newMessageBody: string
}

let mapStateToProps = (state: AppRootStateType): DialogsMapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

type DialogsMapDispatchToPropsType = {
    onNewMessageChange: (value: string) => void
    onClickSendMessage: () => void
}

let mapDispatchToProps = (dispatch: AppDispatch): DialogsMapDispatchToPropsType => {
    return {
        onNewMessageChange: (value: string) => dispatch(updateNewMessageBodyAC(value)),
        onClickSendMessage: () => dispatch(sendMessageAC())
    }
}

export const DialogsContainer = connect<DialogsMapStateToPropsType,DialogsMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Dialogs) // {} own props is empty (because DialogsContainer has no props)