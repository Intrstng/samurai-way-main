import React, {useContext} from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StoreContext} from '../../../StoreContext';
import {connect} from 'react-redux';
import { sendMessageAC, updateNewMessageBodyAC } from '../../../redux/dialogs-reducer';
import { Dialogs } from '../../Dialogs/Dialogs';
import { PostItem } from '../../../redux/state';

let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => dispatch(addPostAC()),
        updateNewPropsText: (value: any) => dispatch(updateNewPostTextAC(value))
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)