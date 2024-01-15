import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionTypes, PostItem} from '../../redux/state';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {AppRootStateType} from '../../redux/redux-store';


export const Profile = () => {
    return (
        <>
            <ProfileInfo />
            {/*<MyPostsContainer posts={state.posts}*/}
            {/*         newPostText={state.newPostText}*/}
            {/*         dispatch={dispatch}/>*/}
            <MyPostsContainer  />
        </>
    );
};