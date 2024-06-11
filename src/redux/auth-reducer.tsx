import { Dispatch } from 'redux';
import { profileAPI, userAuthAPI, usersAPI } from '../api/api';
import { setFollowingInProgressAC, unfollowUserAC, unSetFollowingInProgressAC } from './users-reducer';

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';
const SET_AVATAR_FROM_CURRENT_USERS_PROFILE_TO_AUTH_USER_DATA = 'SET-AVATAR-FROM-CURRENT-USERS-PROFILE-TO-AUTH-USER-DATA';

export type AuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    avatar: string | null
}

const initialAuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    avatar: null
}

export const authReducer = (state: AuthStateType = initialAuthState, action: UsersActionTypes): AuthStateType => {
    const {type} = action
    switch (type) {
        case SET_AUTH_USER_DATA: {
            const {payload} = action
            return {
                ...state,
                ...payload.authData,
                isAuth: true,
            }
        }
        case SET_AVATAR_FROM_CURRENT_USERS_PROFILE_TO_AUTH_USER_DATA: {
            const {payload} = action
            return {
                ...state,
                avatar: payload.avatarFromProfile,
            }
        }
        default:
            return state;
    }
}


type UsersActionTypes = SetAuthUserDataACType | SetAvatarFromCurrentUsersProfileToAuthUserData

export type SetAuthUserDataACType = ReturnType<typeof setAuthUserDataAC>
export const setAuthUserDataAC = (authData: Omit<AuthStateType, 'avatar'>) => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: {
            authData
        }
    } as const
}

export type SetAvatarFromCurrentUsersProfileToAuthUserData = ReturnType<typeof setAvatarFromCurrentUsersProfileToAuthUserDataAC>
export const setAvatarFromCurrentUsersProfileToAuthUserDataAC = (avatarFromProfile: string | null) => {
    return {
        type: SET_AVATAR_FROM_CURRENT_USERS_PROFILE_TO_AUTH_USER_DATA,
        payload: {
            avatarFromProfile
        }
    } as const
}


// THUNK CREATORS

export const getAuthUserDataThunkCreator = () => {
    return (dispatch: Dispatch) => {
        userAuthAPI.authUser()
            .then((response) => {
                if (response.resultCode === 0) { // 0 - means that Authorization is successful
                    dispatch(setAuthUserDataAC(response.data)); // {userId (id), email, login}

                    // Set avatar from loaded current users profile to users auth data
                    return profileAPI.getUsersProfile(response.data.id);
                }
            })
            .then((data) => {
                dispatch(setAvatarFromCurrentUsersProfileToAuthUserDataAC(data.photos.small));
            })
    }
}