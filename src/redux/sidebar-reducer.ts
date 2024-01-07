import {v1} from 'uuid';
import {SidebarItem} from './state';

type SidebarStateType = {
    friends: SidebarItem[]
}

export const sidebarReducer = (state: SidebarStateType, action: any): SidebarStateType => {
    switch (action.type) {
        case 'XXX': {
            return state;
        }
        case 'YYY': {
            return state;
        }
        default: return state;
    }
}