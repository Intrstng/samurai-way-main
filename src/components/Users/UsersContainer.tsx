import React from 'react';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {
    changeIsFetchingStatusAC,
    followUserAC,
    setCurrentPageAC,
    setFollowingInProgressAC,
    setTotalUsersCountAC,
    setUsersAC,
    showMoreUsersAC,
    unfollowUserAC,
    unSetFollowingInProgressAC,
    UserType
} from '../../redux/users-reducer';
import { UsersPresentationComponent } from './UsersPresentationComponent';
import { Preloader } from '../Preloader/Preloader';
import { usersAPI } from '../../api/api';


export class UsersAPIComponent extends React.Component<UsersProps, {}> {
    componentDidMount() {
        this.props.changeIsFetchingStatus(true);
        this.fetchUsers(this.props.currentPage);
    }

    fetchUsers = (page: number) => {
        usersAPI.getUsers(this.props.pageSize, page)
            .then((data) => {
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
                this.props.changeIsFetchingStatus(false);
            });
    }

    fetchUsersForShowMore = (pageSize: number, page: number) => {
        usersAPI.getUsers(pageSize, page)
            .then((data) => {
                this.props.showMoreUsers(data.items);
            });
    };

    setUserAsFollowedAtServerAndSetFollowedInUserState = (userId: string) => {
        if (this.props.isAuthorized) {
            this.props.setFollowingInProgress(userId);

            usersAPI.followUser(userId)
                .then((data) => {
                    if (data.resultCode === 0) {
                        this.props.followUser(userId);
                    }
                    this.props.unSetFollowingInProgress(userId);
                });
        }
    }

    setUserAsUnFollowedAtServerAndSetUnFollowedInUserState = (userId: string) => {
        if (this.props.isAuthorized) {
            this.props.setFollowingInProgress(userId);

            usersAPI.unfollowUser(userId)
                .then((data) => {
                    if (data.resultCode === 0) {
                        this.props.unfollowUser(userId);
                    }
                    this.props.unSetFollowingInProgress(userId);
                });
        }
    }

    render() {
        return this.props.isFetching ? <Preloader/>
            : <UsersPresentationComponent users={this.props.users}
                                          fetchUsers={this.fetchUsers}
                                          fetchUsersForShowMore={this.fetchUsersForShowMore}
                                          setCurrentPage={this.props.setCurrentPage}
                                          totalUsersCount={this.props.totalUsersCount}
                                          currentPage={this.props.currentPage}
                                          pageSize={this.props.pageSize}
                                          followUser={this.setUserAsFollowedAtServerAndSetFollowedInUserState}
                                          unfollowUser={this.setUserAsUnFollowedAtServerAndSetUnFollowedInUserState}
                                          followingInProgress={this.props.followingInProgress}
            />
    }
}


export  type UsersProps = UserMapStateToProps & UsersMapDispatchToPropsType

export type UserMapStateToProps = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isAuthorized: boolean
    followingInProgress: string[]
}

let mapStateToProps = (state: AppRootStateType): UserMapStateToProps => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isAuthorized: state.auth.isAuth,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export type UsersMapDispatchToPropsType = {
    setUsers: (users: UserType[]) => void
    showMoreUsers: (users: UserType[]) => void
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (usersQty: number) => void
    changeIsFetchingStatus: (isFetching: boolean) => void
    setFollowingInProgress: (userId: string) => void
    unSetFollowingInProgress: (userId: string) => void
}

// setUsersAC is named as setUsers we can write property setUsers
export const UsersContainer = connect<UserMapStateToProps, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    setUsers: setUsersAC,
    showMoreUsers: showMoreUsersAC,
    followUser: followUserAC,
    unfollowUser: unfollowUserAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    changeIsFetchingStatus: changeIsFetchingStatusAC,
    setFollowingInProgress: setFollowingInProgressAC,
    unSetFollowingInProgress: unSetFollowingInProgressAC,
})(UsersAPIComponent)




// import React from 'react';
// import { AppRootStateType } from '../../redux/redux-store';
// import { connect } from 'react-redux';
// import {
//     changeIsFetchingStatusAC,
//     followUserAC,
//     setCurrentPageAC, setFollowingInProgressAC,
//     setTotalUsersCountAC,
//     setUsersAC,
//     showMoreUsersAC,
//     unfollowUserAC, unSetFollowingInProgressAC,
//     UserStateType,
//     UserType
// } from '../../redux/users-reducer';
// import axios from 'axios';
// import { UsersPresentationComponent } from './UsersPresentationComponent';
// import { Preloader } from '../Preloader/Preloader';
// import { usersAPI } from '../../api/api';
//
//
//
// export class UsersAPIComponent extends React.Component<UsersProps, {}> {
//     componentDidMount() {
//         this.props.changeIsFetchingStatus(true);
//         this.fetchUsers(this.props.currentPage);
//     }
//
//     fetchUsers = (page: number) => {
//         usersAPI.getUsers(this.props.pageSize, page)
//             .then((data) => {
//                 this.props.setUsers(data.items);
//                 this.props.setTotalUsersCount(data.totalCount);
//                 this.props.changeIsFetchingStatus(false);
//             });
//     }
//
//     fetchUsersForShowMore = (pageSize: number, page: number) => {
//         usersAPI.getUsers(pageSize, page)
//             .then((data) => {
//                 this.props.showMoreUsers(data.items);
//             });
//     };
//
//     setUserAsFollowedAtServerAndSetFollowedInUserState = (userId: string) => {
//         if (this.props.isAuthorized) {
//             this.props.setFollowingInProgress(userId, true);
//
//             usersAPI.followUser(userId)
//                 .then((data) => {
//                     if (data.resultCode === 0) {
//                         this.props.followUser(userId);
//                     }
//                     this.props.unSetFollowingInProgress(userId, false);
//                 });
//         }
//     }
//
//     setUserAsUnFollowedAtServerAndSetUnFollowedInUserState = (userId: string) => {
//         if (this.props.isAuthorized) {
//             this.props.setFollowingInProgress(userId, true);
//
//             usersAPI.unfollowUser(userId)
//                 .then((data) => {
//                     if (data.resultCode === 0) {
//                         this.props.unfollowUser(userId);
//                     }
//                     this.props.unSetFollowingInProgress(userId, false);
//                 });
//         }
//     }
//
//     render() {
//         return this.props.isFetching ? <Preloader/>
//             : <UsersPresentationComponent users={this.props.users}
//                                           fetchUsers={this.fetchUsers}
//                                           fetchUsersForShowMore={this.fetchUsersForShowMore}
//                                           setCurrentPage={this.props.setCurrentPage}
//                                           totalUsersCount={this.props.totalUsersCount}
//                                           currentPage={this.props.currentPage}
//                                           pageSize={this.props.pageSize}
//                                           followUser={this.setUserAsFollowedAtServerAndSetFollowedInUserState}
//                                           unfollowUser={this.setUserAsUnFollowedAtServerAndSetUnFollowedInUserState}
//                                           followingInProgress={this.props.followingInProgress}
//             />
//     }
// }
//
//
// export  type UsersProps = UserMapStateToProps & UsersMapDispatchToPropsType
//
// export type UserMapStateToProps = {
//     users: UserType[]
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     isAuthorized: boolean
//     followingInProgress: string[]
// }
//
// let mapStateToProps = (state: AppRootStateType): UserMapStateToProps => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         isAuthorized: state.auth.isAuth,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }
//
// export type UsersMapDispatchToPropsType = {
//     setUsers: (users: UserType[]) => void
//     showMoreUsers: (users: UserType[]) => void
//     followUser: (userId: string) => void
//     unfollowUser: (userId: string) => void
//     setCurrentPage: (page: number) => void
//     setTotalUsersCount: (usersQty: number) => void
//     changeIsFetchingStatus: (isFetching: boolean) => void
//     setFollowingInProgress: (userId: string, isFetching: boolean) => void
//     unSetFollowingInProgress: (userId: string, isFetching: boolean) => void
// }
//
// // setUsersAC is named as setUsers we can write property setUsers
// export const UsersContainer = connect<UserMapStateToProps, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
//     setUsers: setUsersAC,
//     showMoreUsers: showMoreUsersAC,
//     followUser: followUserAC,
//     unfollowUser: unfollowUserAC,
//     setCurrentPage: setCurrentPageAC,
//     setTotalUsersCount: setTotalUsersCountAC,
//     changeIsFetchingStatus: changeIsFetchingStatusAC,
//     setFollowingInProgress: setFollowingInProgressAC,
//     unSetFollowingInProgress: unSetFollowingInProgressAC,
// })(UsersAPIComponent)