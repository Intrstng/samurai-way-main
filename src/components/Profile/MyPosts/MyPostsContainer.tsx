import React, {useContext} from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreContext} from '../../../StoreContext';
import {connect} from 'react-redux';
import { sendMessageAC, updateNewMessageBodyAC } from '../../../redux/dialogs-reducer';
import { Dialogs } from '../../Dialogs/Dialogs';
import { AppDispatch, DialogsItem, MessageItem, PostItem } from '../../../redux/state';
import { AppRootStateType } from '../../../redux/redux-store';
import { Dispatch } from 'redux';



export  type MyPostsProps = MyPostsMapStateToPropsType & MyPostsMapDispatchToPropsType

type MyPostsMapStateToPropsType = {
    posts: PostItem[]
    newPostText: string
}

let mapStateToProps = (state: AppRootStateType): MyPostsMapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

type MyPostsMapDispatchToPropsType = {
    addPost: () => void
    updateNewPropsText: (value: string) => void
}
// Dispatch type import from redux!!!
// let mapDispatchToProps = (dispatch: Dispatch): MyPostsMapDispatchToPropsType => {
//     return {
//         addPost: () => dispatch(addPostAC()),
//         updateNewPropsText: (value: string) => dispatch(updateNewPostTextAC(value))
//     }
// }
//
// export const MyPostsContainer = connect<MyPostsMapStateToPropsType, MyPostsMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

// addPostAC is named as addPost we can write property addPost
export const MyPostsContainer = connect<MyPostsMapStateToPropsType, MyPostsMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    addPost: addPostAC,
    updateNewPropsText: updateNewPostTextAC,
})(MyPosts)