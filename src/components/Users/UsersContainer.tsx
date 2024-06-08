import React from 'react';
import { PostItem } from '../../redux/state';
import { AppRootStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { addPostAC, updateNewPostTextAC } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { MyPosts } from '../Profile/MyPosts/MyPosts';
import { Users } from './Users';
import {
  followUserAC,
  setUsersAC,
  showMoreUsersAC,
  unfollowUserAC,
  UserStateType,
  UserType
} from '../../redux/users-reducer';
import { UsersC } from './UsersC';


export  type UsersProps = UserStateType & UsersMapDispatchToPropsType

let mapStateToProps = (state: AppRootStateType): UserStateType => {
  return {
    users: state.usersPage.users
  }
}

type UsersMapDispatchToPropsType = {
  setUsers: (users:  UserType[]) => void
  showMoreUsers: (users:  UserType[]) => void
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}
// Dispatch type import from redux!!!
let mapDispatchToProps = (dispatch: Dispatch): UsersMapDispatchToPropsType => {
  return {
    setUsers: (users:  UserType[]) => dispatch(setUsersAC(users)),
    showMoreUsers: (users:  UserType[]) => dispatch(showMoreUsersAC(users)),
    followUser: (userId: string) => dispatch(followUserAC(userId)),
    unfollowUser: (userId: string) => dispatch(unfollowUserAC(userId)),
  }
}

// export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Users)


export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(UsersC)