import {v1} from 'uuid';
import {SidebarItem} from './state';

type SidebarStateType = {
    friends: SidebarItem[]
}

const initialSidebarState: SidebarStateType = {
    friends: [
        {id: v1(), name: 'Jeremy', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-7.png'},
        {id: v1(), name: 'Kate', src: 'https://iconape.com/wp-content/png_logo_vector/avatar-3.png'},
        {id: v1(), name: 'Helen', src: 'https://iconape.com/wp-content/files/lv/10837/png/iconfinder_5_avatar_2754581.png'}
    ]
}

export const sidebarReducer = (state: SidebarStateType = initialSidebarState, action: any): SidebarStateType => {
    // switch (action.type) {
    //     case 'XXX': {
    //         return state;
    //     }
    //     case 'YYY': {
    //         return state;
    //     }
    //     default: return state;
    // }
    return state
}