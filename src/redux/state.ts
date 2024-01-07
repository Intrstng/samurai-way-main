import {v1} from 'uuid';


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
    }
    sidebar: {
        friends: SidebarItem[]
    }
}



type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void
    _updateNewPostText: (newText: string) => void //!!!!!!!!!!!!!!! //
    // subscribe: (observer: any) => void
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionTypes) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: 'Post 1', likesCount: 14},
                {id: v1(), message: 'Post 2', likesCount: 11},
                {id: v1(), message: 'Post 3', likesCount: 17},
                {id: v1(), message: 'Post 4', likesCount: 9}
            ],
            newPostText: ''
        },
        dialogsPage: {
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
            ]
        },
        sidebar: {
            friends: [
                {id: v1(), name: 'Jeremy', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-7.png'},
                {id: v1(), name: 'Kate', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-3.png'},
                {id: v1(), name: 'Helen', src: 'https://iconape.com/wp-content/files/lv/10837/png/iconfinder_5_avatar_2754581.png'}
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
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._updateNewPostText(''); //!!!!!!!!!!!!!!! //
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            // this._updateNewPostText(action.payload.text);
            this._state.profilePage.newPostText = action.payload.text;
            this._callSubscriber(this._state);
        }
    },

    _updateNewPostText(newText) { //!!!!!!!!!!!!!!! //
        this._state.profilePage.newPostText = newText;//!!!!!!!!!!!!!!! //
        this._callSubscriber(this._state);//!!!!!!!!!!!!!!! //
    }
}

export type ActionTypes = AddPostACType | UpdateNewPostTextACType

type AddPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}

type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        payload: {
            text: newText
        }
    } as const
}

Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});