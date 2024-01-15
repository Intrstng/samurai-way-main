import React, {useContext} from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreContext} from '../../../StoreContext';


export const MyPostsContainer = () => {
    // let store = useContext(StoreContext);

    return (
        <StoreContext.Consumer>
            {  // фигурные скобки <StoreContext.Consumer> на новой строке
                (store: any) => {
                    let state = store.getState().profilePage;
                    const onClickAddPost = () => {
                        store.dispatch(addPostAC());
                    }

                    const onPostChange = (value: string) => {
                        store.dispatch(updateNewPostTextAC(value));
                    }

                    return (<MyPosts updateNewPropsText={onPostChange}
                             addPost={onClickAddPost}
                             posts={state.posts}
                             newPostText={state.newPostText}/>)
                }
            }
        </StoreContext.Consumer>
    );
};