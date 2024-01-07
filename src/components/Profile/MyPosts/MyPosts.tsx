import React, {FC, useRef} from 'react';
import S from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionTypes, PostItem} from '../../../redux/state';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';

type MyPostsProps = {
    posts: PostItem[]
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export const MyPosts: FC<MyPostsProps> = ({posts, newPostText, dispatch}) => {
    const postsElements = posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const onClickAddPost = () => {
        dispatch(addPostAC());
    }

    const onPostChange = () => {
        if (inputRef.current) {
            dispatch(updateNewPostTextAC(inputRef.current.value));
        }
    }

    return (
        <>
            <div className={S.posts}>
                <h3>My posts</h3>
                <textarea ref={inputRef} value={newPostText} id="postText" name="postText" placeholder="Write a post..." onChange={onPostChange}/>
                <button onClick={onClickAddPost}>Send</button>
            </div>
            <div className={S.postItems}>
                {postsElements}
            </div>
        </>
    );
};