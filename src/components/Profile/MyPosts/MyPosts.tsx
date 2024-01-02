import React from 'react';
import S from './MyPosts.module.css';
import {Post} from './Post/Post';

export const MyPosts = () => {
    return (
        <>
            <div className={S.posts}>
                <h3>My posts</h3>
                <textarea id="postText" name="postText" placeholder="Write a post..."></textarea>
                <button>Send</button>
            </div>
            <div className={S.postItems}>
                <Post message={'Post 1'}
                      likes={15}/>
                <Post message={'Post 2'}
                      likes={25}/>
            </div>
        </>
    );
};