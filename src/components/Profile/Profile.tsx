import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionTypes, PostItem} from '../../redux/state';

type ProfileProps = {
    state: {
        posts: PostItem[]
        newPostText: string
    }
    dispatch: (action: ActionTypes) => void
}

export const Profile: FC<ProfileProps> = ({state,  dispatch}) => {
    return (
        <>
            <ProfileInfo />
            <MyPosts posts={state.posts}
                     newPostText={state.newPostText}
                     dispatch={dispatch}/>
        </>
    );
};