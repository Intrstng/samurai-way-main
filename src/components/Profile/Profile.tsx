import React from 'react';
import S from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';

export const Profile = () => {
    return (
        <>
            <ProfileInfo />
            <MyPosts />
        </>
    );
};