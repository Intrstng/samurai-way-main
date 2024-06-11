import { applyMiddleware, combineReducers, createStore } from 'redux';
import {sidebarReducer} from './sidebar-reducer';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';
import thunkMiddleware from 'redux-thunk'; // импорт по дефолту (т.е. было: import thunk from 'redux-thunk';)

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>


// export type StoreType = Store<AppRootStateType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


//@ts-ignore
window.store = store