import React from 'react';
import { PostItem } from '../../redux/state';
import { AppRootStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { addPostAC, updateNewPostTextAC } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { MyPosts } from '../Profile/MyPosts/MyPosts';
import {
  changeIsFetchingStatusAC,
  followUserAC, setCurrentPageAC, setTotalUsersCountAC,
  setUsersAC,
  showMoreUsersAC,
  unfollowUserAC,
  UserStateType,
  UserType
} from '../../redux/users-reducer';
import axios from 'axios';
import { UsersPresentationComponent } from './UsersPresentationComponent';
import loadingSpinner from '../../assets/images/Loading_spinner.gif';
import { Preloader } from '../Preloader/Preloader';


export class UsersAPIComponent extends React.Component<UsersProps, {}> {
  componentDidMount() {
    this.fetchUsers(this.props.currentPage);
  }

  fetchUsers = (page: number) => {
    this.props.changeIsFetchingStatus(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
        this.props.changeIsFetchingStatus(false);
      });
  };

  fetchUsersToShowMore = () => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage + 1}`
      )
      .then((response) => {
        this.props.showMoreUsers(response.data.items);
      });
  };

  render() {
    return this.props.isFetching ? <Preloader />
                                  : <UsersPresentationComponent fetchUsers={this.fetchUsers}
                                                                fetchUsersToShowMore={this.fetchUsersToShowMore}
                                                                setCurrentPage={this.props.setCurrentPage}
                                                                users={this.props.users}
                                                                totalUsersCount={this.props.totalUsersCount}
                                                                currentPage={this.props.currentPage}
                                                                pageSize={this.props.pageSize}
                                                                followUser={this.props.followUser}
                                                                unfollowUser={this.props.unfollowUser} />
  }
}


export  type UsersProps = UserStateType & UsersMapDispatchToPropsType

let mapStateToProps = (state: AppRootStateType): UserStateType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}

type UsersMapDispatchToPropsType = {
  setUsers: (users:  UserType[]) => void
  showMoreUsers: (users:  UserType[]) => void
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
  setCurrentPage: (page: number) => void
  setTotalUsersCount: (usersQty: number) => void
  changeIsFetchingStatus: (isFetching: boolean) => void
}
// Dispatch type import from redux!!!
// let mapDispatchToProps = (dispatch: Dispatch): UsersMapDispatchToPropsType => {
//   return {
//     setUsers: (users:  UserType[]) => dispatch(setUsersAC(users)),
//     showMoreUsers: (users:  UserType[]) => dispatch(showMoreUsersAC(users)),
//     followUser: (userId: string) => dispatch(followUserAC(userId)),
//     unfollowUser: (userId: string) => dispatch(unfollowUserAC(userId)),
//     setCurrentPage: (page: number) => dispatch(setCurrentPageAC(page)),
//     setTotalUsersCount: (usersQty: number) => dispatch(setTotalUsersCountAC(usersQty)),
//     changeIsFetchingStatus: (isFetching: boolean) => dispatch(changeIsFetchingStatusAC(isFetching))
//   }
// }

// // export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Users)

// export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)


// setUsersAC is named as setUsers we can write property setUsers
export const UsersContainer = connect<UserStateType, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps,  {
  setUsers: setUsersAC,
  showMoreUsers: showMoreUsersAC,
  followUser: followUserAC,
  unfollowUser: unfollowUserAC,
  setCurrentPage: setCurrentPageAC,
  setTotalUsersCount: setTotalUsersCountAC,
  changeIsFetchingStatus: changeIsFetchingStatusAC,
})(UsersAPIComponent)