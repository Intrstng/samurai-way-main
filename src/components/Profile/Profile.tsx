import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';


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