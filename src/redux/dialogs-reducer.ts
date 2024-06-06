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

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

const inintialDialogsState: DialogsStateType = {
    messages: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'It`s awesome!'},
        {id: v1(), message: 'Nice to meet you!'}
    ],
    dialogs: [
        {id: v1(), name: 'Tom', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-10.png'},
        {id: v1(), name: 'Joe', src: 'https://iconape.com/wp-content/files/ui/10834/png/iconfinder_2_avatar_2754578.png'},
        {id: v1(), name: 'Ann', src: 'https://iconape.com/wp-content/files/jj/10835/png/iconfinder_4_avatar_2754580.png'},
        {id: v1(), name: 'Tim', src: 'https://iconape.com/wp-content/files/xf/10838/png/iconfinder_7_avatar_2754582.png'}
    ],
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsStateType = inintialDialogsState, action: ActionTypes): DialogsStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            state.newMessageBody = action.payload.body;
            return state;
        }
        case SEND_MESSAGE: {
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
        type: SEND_MESSAGE,
    } as const
}

export type UpdateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export const updateNewMessageBodyAC = (newText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        payload: {
            body: newText
        }
    } as const
}