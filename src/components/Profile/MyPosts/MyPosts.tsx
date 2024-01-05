import React, {FC, useRef} from 'react';
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
    newPostText: string
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const MyPosts: FC<MyPostsProps> = ({posts, newPostText, addPost, updateNewPostText}) => {
    const postsElements = posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const onClickAddPost = () => {
        addPost();
    }

    const onPostChange = () => {
        if (inputRef.current) {
            updateNewPostText(inputRef.current.value);
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