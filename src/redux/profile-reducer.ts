import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

type ProfileStateType = {
    posts: PostItem[]
    newPostText: string
}

const initialProfileState: ProfileStateType = {
    posts: [
        {id: v1(), message: 'Post 1', likesCount: 14},
        {id: v1(), message: 'Post 2', likesCount: 11},
        {id: v1(), message: 'Post 3', likesCount: 17},
        {id: v1(), message: 'Post 4', likesCount: 9}
    ],
    newPostText: ''
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