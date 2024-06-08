import {combineReducers, createStore} from 'redux';
import {sidebarReducer} from './sidebar-reducer';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import { usersReducer } from './users-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>


// export type StoreType = Store<AppRootStateType>

export const store = createStore(rootReducer);


//@ts-ignore
window.store = store