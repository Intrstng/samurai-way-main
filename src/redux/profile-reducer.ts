import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';
import { Dispatch } from 'redux';
import { profileAPI, usersAPI } from '../api/api';
import { changeIsFetchingStatusAC, getUsersThunkCreator, setTotalUsersCountAC, setUsersAC } from './users-reducer';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

export type ProfileStateType = {
    posts: PostItem[]
    newPostText: string
    profile: ProfileType
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
} | null

const initialProfileState: ProfileStateType = {
    posts: [
        {id: v1(), message: 'Post 1', likesCount: 14},
        {id: v1(), message: 'Post 2', likesCount: 11},
        {id: v1(), message: 'Post 3', likesCount: 17},
        {id: v1(), message: 'Post 4', likesCount: 9},
    ],
    profile: null,
    //   {
    //     userId: 1,
    //     lookingForAJob: true,
    //     lookingForAJobDescription: '',
    //     fullName: '',
    //     aboutMe: '',
    //     contacts: {
    //         github: '',
    //         vk: '',
    //         facebook: '',
    //         instagram: '',
    //         twitter: '',
    //         website: '',
    //         youtube: '',
    //         mainLink: '',
    //     },
    //     photos: {
    //         small: null,
    //         large: null,
    //     }
    // },
    newPostText: '',
}

export const profileReducer = (state: ProfileStateType = initialProfileState, action: ActionTypes): ProfileStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.payload.text
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload.profile
            }
        }
        default: return state;
    }
}


export type AddPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: ADD_POST,
    } as const
}

export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        payload: {
            text: newText
        }
    } as const
}

export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        payload: {
            profile
        }
    } as const
}


// THUNK CREATORS

export const getCurrentUserProfileThunkCreator = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getUsersProfile(userId)
            .then((data) => {
                dispatch(setUserProfileAC(data));
            });
    }
}