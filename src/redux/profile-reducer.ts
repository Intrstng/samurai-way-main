import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';


type ProfileStateType = {
    posts: PostItem[]
    newPostText: string
}

export const profileReducer = (state: ProfileStateType, action: ActionTypes): ProfileStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            state.newPostText = action.payload.text;
            return state;
        }
        default: return state;
    }
}


export type AddPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}

export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        payload: {
            text: newText
        }
    } as const
}