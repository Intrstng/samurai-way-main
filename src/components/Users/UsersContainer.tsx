import React from 'react';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {
  changeIsFetchingStatusAC,
  followUserAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  showMoreUsersAC,
  unfollowUserAC,
  UserStateType,
  UserType
} from '../../redux/users-reducer';
import axios from 'axios';
import { UsersPresentationComponent } from './UsersPresentationComponent';
import { Preloader } from '../Preloader/Preloader';

const MY_API_KEY = '70e71a7e-5d1b-4284-82b3-3a6364ed9f2a';

export class UsersAPIComponent extends React.Component<UsersProps, {}> {
  componentDidMount() {
    this.fetchUsers(this.props.currentPage);
  }

  fetchUsers = (page: number) => {
    this.props.changeIsFetchingStatus(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`,
    {
              withCredentials: true,
          }
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
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage + 1}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.showMoreUsers(response.data.items);
      });
  };

  setUserAsFollowedAtServerAndSetFollowedInUserState = (userId: string) => {
    if (this.props.isAuthorized) {
      axios
        .post(
          `https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
          {
            withCredentials: true,
            headers: {
              'API-KEY': MY_API_KEY,
            }
          }
        )
        .then((response) => {
          if (response.data.resultCode === 0) {
            this.props.followUser(userId);
          }
        });

    }
  }

  setUserAsUnFollowedAtServerAndSetUnFollowedInUserState = (userId: string) => {
    if (this.props.isAuthorized) {
      axios
        .delete(
          `https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
          {
            withCredentials: true,
            headers: {
              'API-KEY': MY_API_KEY,
            }
          }
        )
        .then((response) => {
          if (response.data.resultCode === 0) {
            this.props.unfollowUser(userId);
          }
        });

    }
  }


  render() {
    return this.props.isFetching ? <Preloader />
                                  : <UsersPresentationComponent users={this.props.users}
                                                                fetchUsers={this.fetchUsers}
                                                                fetchUsersToShowMore={this.fetchUsersToShowMore}
                                                                setCurrentPage={this.props.setCurrentPage}
                                                                totalUsersCount={this.props.totalUsersCount}
                                                                currentPage={this.props.currentPage}
                                                                pageSize={this.props.pageSize}
                                                                followUser={this.setUserAsFollowedAtServerAndSetFollowedInUserState}
                                                                unfollowUser={this.setUserAsUnFollowedAtServerAndSetUnFollowedInUserState} />
  }
}


export  type UsersProps = UserMapStateToProps & UsersMapDispatchToPropsType

export type UserMapStateToProps = {
  users:  UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isAuthorized: boolean
}

let mapStateToProps = (state: AppRootStateType): UserMapStateToProps => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isAuthorized: state.auth.isAuth,
  }
}

export type UsersMapDispatchToPropsType = {
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
export const UsersContainer = connect<UserMapStateToProps, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps,  {
  setUsers: setUsersAC,
  showMoreUsers: showMoreUsersAC,
  followUser: followUserAC,
  unfollowUser: unfollowUserAC,
  setCurrentPage: setCurrentPageAC,
  setTotalUsersCount: setTotalUsersCountAC,
  changeIsFetchingStatus: changeIsFetchingStatusAC,
})(UsersAPIComponent)