import {v1} from 'uuid';
import {
    AddPostACType,
    profileReducer,
    SetUserProfileACType, SetUserStatusACType,
    UpdateNewPostTextACType
} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {AddMessageACType, dialogsReducer, UpdateNewMessageBodyACType} from './dialogs-reducer';
import { UserStateType, UserType } from './users-reducer';


export type PostItem = {
    id: string
    message: string
    likesCount: number
}

export type DialogsItem = {
    id: string
    name: string
    src: string
}

export type MessageItem = {
    id: string
    message: string
}

export type SidebarItem = {
    id: string
    name: string
    src: string
}

export type RootStateType = {
    profilePage: {
        posts: PostItem[]
        newPostText: string
    }
    dialogsPage: {
        dialogs: DialogsItem[]
        messages: MessageItem[]
        newMessageBody: string
    }
    usersPage: {
        users: UserType[]
    }
    sidebar: {
        friends: SidebarItem[]
    }
}

export type ActionTypes = AddPostACType |
                          UpdateNewPostTextACType |
                          UpdateNewMessageBodyACType |
                          AddMessageACType |
                          SetUserProfileACType |
                          SetUserStatusACType


type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionTypes) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                // {id: v1(), message: 'Post 2', likesCount: 14},
                // {id: v1(), message: 'Post 2', likesCount: 11},
                // {id: v1(), message: 'Post 3', likesCount: 17},
                // {id: v1(), message: 'Post 4', likesCount: 9}
            ],
            newPostText: ''
        },
        dialogsPage: {
            messages: [
                // {id: v1(), message: 'Hi'},
                // {id: v1(), message: 'How are you?'},
                // {id: v1(), message: 'It`s awesome!'},
                // {id: v1(), message: 'Nice to meet you!'}
            ],
            dialogs: [
                // {id: v1(), name: 'Tom', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-10.png'},
                // {id: v1(), name: 'Joe', src: 'https://iconape.com/wp-content/files/ui/10834/png/iconfinder_2_avatar_2754578.png'},
                // {id: v1(), name: 'Ann', src: 'https://iconape.com/wp-content/files/jj/10835/png/iconfinder_4_avatar_2754580.png'},
                // {id: v1(), name: 'Tim', src: 'https://iconape.com/wp-content/files/xf/10838/png/iconfinder_7_avatar_2754582.png'}
            ],
            newMessageBody: ''
        },
        usersPage: {
            users: [
                // {id: v1(), status: 'Married', name: 'Doctor', location: {country: 'Belgium', city: 'Gant'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=hdOTX4S6VF7r&format=png&color=000000'},
                // {id: v1(), status: 'Married', name: 'Lawyer', location: {country: 'Canada', city: 'Toronto'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=lehomL5GkqeO&format=png&color=000000'},
                // {id: v1(), status: 'Single', name: 'Support', location: {country: 'Germany', city: 'Baden-Baden'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=FzR2LK6FnqKI&format=png&color=000000'},
                // {id: v1(), status: 'Married', name: 'Nurse', location: {country: 'Slovakia', city: 'Zhilina'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=nsdyNwmAYXWH&format=png&color=000000'},
            ],
        },
        sidebar: {
            friends: [
                // {id: v1(), name: 'Jeremy', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-7.png'},
                // {id: v1(), name: 'Kate', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-3.png'},
                // {id: v1(), name: 'Helen', src: 'https://iconape.com/wp-content/files/lv/10837/png/iconfinder_5_avatar_2754581.png'}
            ]
        }
    },
    _callSubscriber(state) {
        console.log(state)
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        // this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
}


export type AppDispatch = typeof store.dispatch

Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});