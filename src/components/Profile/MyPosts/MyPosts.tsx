import React, {FC} from 'react';
import S from './MyPosts.module.css';
import {Post} from './Post/Post';
import {v1} from 'uuid';
import {PostItem} from '../../../redux/state';

// type PostItem = {
//     id: string
//     message: string
//     likesCount: number
// }

type MyPostsProps = {
    posts: PostItem[]
}

export const MyPosts: FC<MyPostsProps> = (props) => {
    const postsElements = props.posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)
    return (
        <>
            <div className={S.posts}>
                <h3>My posts</h3>
                <textarea id="postText" name="postText" placeholder="Write a post..."></textarea>
                <button>Send</button>
            </div>
            <div className={S.postItems}>
                {postsElements}
            </div>
        </>
    );
};