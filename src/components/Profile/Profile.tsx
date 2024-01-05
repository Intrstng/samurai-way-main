import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostItem} from '../../redux/state';

type ProfileProps = {
    state: {
        posts: PostItem[]
        newPostText: string
    }
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const Profile: FC<ProfileProps> = ({state,  addPost, updateNewPostText}) => {
    return (
        <>
            <ProfileInfo />
            <MyPosts posts={state.posts}
                     newPostText={state.newPostText}
                     addPost={addPost}
                     updateNewPostText={updateNewPostText}/>
        </>
    );
};