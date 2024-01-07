import {v1} from 'uuid';
import {
    ActionTypes,
    DialogsItem, MessageItem,
} from './state';

type DialogsStateType = {
    dialogs: DialogsItem[]
    messages: MessageItem[]
    newMessageBody: string
}

export const dialogsReducer = (state: DialogsStateType, action: ActionTypes): DialogsStateType => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY': {
            state.newMessageBody = action.payload.body;
            return state;
        }
        case 'SEND-MESSAGE': {
            const newMessage = {
                id: v1(),
                message: state.newMessageBody
            };
            state.messages.push(newMessage);
            state.newMessageBody = '';
            return state;
        }
        default: return state;
    }
}

export type AddMessageACType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}

export type UpdateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export const updateNewMessageBodyAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        payload: {
            body: newText
        }
    } as const
}