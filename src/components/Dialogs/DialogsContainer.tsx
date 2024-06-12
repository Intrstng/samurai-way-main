import React from 'react';
import { sendMessageAC, updateNewMessageBodyAC } from '../../redux/dialogs-reducer';
import { Dialogs } from './Dialogs';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import { DialogsItem, MessageItem } from '../../redux/state';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';


export type DialogsPropsType = DialogsMapStateToPropsType & DialogsMapDispatchToPropsType

type DialogsMapStateToPropsType = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
    newMessageBody: string
}

let mapStateToProps = (state: AppRootStateType): DialogsMapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
    }
}

type DialogsMapDispatchToPropsType = {
    onNewMessageChange: (value: string) => void
    onClickSendMessage: () => void
}


// updateNewMessageBodyAC is named as onNewMessageChange we can write property onNewMessageChange
export const DialogsContainer = WithAuthRedirect(connect<DialogsMapStateToPropsType,DialogsMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    onNewMessageChange: updateNewMessageBodyAC,
    onClickSendMessage: sendMessageAC,
})(Dialogs))