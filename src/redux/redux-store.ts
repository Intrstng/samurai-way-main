import {combineReducers, createStore, Store} from 'redux';
import {sidebarReducer} from './sidebar-reducer';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {ActionTypes} from './state';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>


// export type StoreType = Store<AppRootStateType>

export const store = createStore(rootReducer);