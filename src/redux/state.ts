import {v1} from 'uuid';
import {ReactHTML} from 'react';


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

export type StateType = {
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
    _state: StateType
    getState: () => StateType
    _callSubscriber: (state: StateType) => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: any) => void
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
    getState() {
        return this._state;
    },
    _callSubscriber(state: StateType) {
        console.log(state)
    },
    addPost() {
        const newPost = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };

        this._state.profilePage.posts.push(newPost);
        this.updateNewPostText('');
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    // Проверить типизацию subscribe
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    }
}

Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});