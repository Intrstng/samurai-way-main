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

export type StateType = {
    profilePage: {
        post: PostItem[]
    }
    dialogsPage: {
        dialogs: DialogsItem[]
        messages: MessageItem[]
    }
    sidebar: {
        friends: SidebarItem[]
    }
}

export const state: StateType = {
    profilePage: {
        post: [
            {id: v1(), message: 'Post 1', likesCount: 14},
            {id: v1(), message: 'Post 2', likesCount: 11},
            {id: v1(), message: 'Post 3', likesCount: 17},
            {id: v1(), message: 'Post 4', likesCount: 9}
        ]
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
            {id: v1(), name: 'Tyuuuyuyyuim', src: 'https://iconape.com/wp-content/files/xf/10838/png/iconfinder_7_avatar_2754582.png'}
        ]
    },
    sidebar: {
        friends: [
            {id: v1(), name: 'Jeremy', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-7.png'},
            {id: v1(), name: 'Kate', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-3.png'},
            {id: v1(), name: 'Helen', src: 'https://iconape.com/wp-content/files/lv/10837/png/iconfinder_5_avatar_2754581.png'}
        ]
    }
}