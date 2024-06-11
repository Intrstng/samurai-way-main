import React from 'react';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {
    followUserAC,
    getUsersForShowMoreThunkCreator,
    getUsersThunkCreator,
    setCurrentPageAC,
    setFollowingInProgressAC,
    setTotalUsersCountAC,
    setUserAsFollowedAtServerAndSetFollowedInUserStateThunkCreator,
    setUserAsUnFollowedAtServerAndSetUnFollowedInUserStateThunkCreator,
    setUsersAC,
    showMoreUsersAC,
    unfollowUserAC,
    unSetFollowingInProgressAC,
    UserType
} from '../../redux/users-reducer';
import { UsersPresentationComponent } from './UsersPresentationComponent';
import { Preloader } from '../Preloader/Preloader';


export class UsersAPIComponent extends React.Component<UsersProps, {}> {
    componentDidMount() {
        this.fetchUsers(this.props.currentPage);
    }

    fetchUsers = (page: number) => {
        this.props.getUsers(this.props.pageSize, page);
    }

    fetchUsersForShowMore = (page: number) => {
        this.props.getUsersForShowMore(this.props.pageSize, page);
    };

    setUserAsFollowedAtServerAndSetFollowedInUserState = (userId: string) => {
        this.props.setUserAsFollowedAtServerAndSetFollowedInUserState(userId, this.props.isAuthorized)
    }

    setUserAsUnFollowedAtServerAndSetUnFollowedInUserState = (userId: string) => {
        this.props.setUserAsUnFollowedAtServerAndSetUnFollowedInUserState(userId, this.props.isAuthorized)
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
                                          isAuthorized={this.props.isAuthorized}
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
    setCurrentPage: (page: number) => void

    getUsers: (pageSize: number, page: number) => void
    getUsersForShowMore: (pageSize: number, page: number) => void
    setUserAsFollowedAtServerAndSetFollowedInUserState: (userId: string, isAuthorized: boolean) => void
    setUserAsUnFollowedAtServerAndSetUnFollowedInUserState: (userId: string, isAuthorized: boolean) => void
}

// setUsersAC is named as setUsers we can write property setUsers
export const UsersContainer = connect<UserMapStateToProps, UsersMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    setCurrentPage: setCurrentPageAC,

    getUsers: getUsersThunkCreator,
    getUsersForShowMore: getUsersForShowMoreThunkCreator,
    setUserAsFollowedAtServerAndSetFollowedInUserState: setUserAsFollowedAtServerAndSetFollowedInUserStateThunkCreator,
    setUserAsUnFollowedAtServerAndSetUnFollowedInUserState: setUserAsUnFollowedAtServerAndSetUnFollowedInUserStateThunkCreator,
})(UsersAPIComponent)