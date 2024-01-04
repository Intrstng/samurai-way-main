import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostItem} from '../../redux/state';

type ProfileProps = {
    posts: PostItem[]
}

export const Profile: FC<ProfileProps> = (props) => {
    return (
        <>
            <ProfileInfo />
            <MyPosts posts={props.posts}/>
        </>
    );
};