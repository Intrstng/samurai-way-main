import React from 'react';
import { PostItem } from '../../redux/state';
import { AppRootStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { addPostAC, updateNewPostTextAC } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { MyPosts } from '../Profile/MyPosts/MyPosts';
import { Users } from './Users';
import { followUserAC, setUsersAC, unfollowUserAC, UserStateType, UserType } from '../../redux/users-reducer';


export  type UsersProps = UserStateType & UsersMapDispatchToPropsType

// type UsersMapStateToPropsType = {
//   id: string
//   status: string
//   name: string
//   location: {
//     country: string
//     city: string
//   }
//   followed: boolean
//   avatar: string
// }

let mapStateToProps = (state: AppRootStateType): UserStateType => {
  return {
    users: state.usersPage.users
  }
}

type UsersMapDispatchToPropsType = {
  setUsers: (users:  UserType[]) => void
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}
// Dispatch type import from redux!!!
let mapDispatchToProps = (dispatch: Dispatch): UsersMapDispatchToPropsType => {
  return {
    setUsers: (users:  UserType[]) => dispatch(setUsersAC(users)),
    followUser: (userId: string) => dispatch(followUserAC(userId)),
    unfollowUser: (userId: string) => dispatch(unfollowUserAC(userId)),
  }
}

export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Users)