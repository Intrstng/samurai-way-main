import { usersAPI } from '../api/api';
import { Dispatch } from 'redux';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SHOW_MORE_USERS = 'SHOW-MORE-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const CHANGE_IS_FETCHING = 'CHANGE-IS-FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'SET-FOLLOWING-IN-PROGRESS';
const UNSET_FOLLOWING_IN_PROGRESS = 'UNSET-FOLLOWING-IN-PROGRESS';

export type UserType = {
    id: string
    name: string
    status: string
    followed: boolean
    photos: {
        small: string | null,
        large: string | null
    }
}

export type UserStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
}

const initialUsersState: UserStateType = {
    users: [
        // {
        //   id: '1',
        //   name: 'Tom',
        //   status: 'text',
        //   followed: true,
        //   photos: {
        //     small: null,
        //     large: null
        //   }
        // }
    ],
    pageSize: 5,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: UserStateType = initialUsersState, action: UsersActionTypes): UserStateType => {
    const {type} = action
    switch (type) {
        case SET_USERS: {
            const {payload} = action
            return {
                ...state,
                users: payload.users
            }
        }
        case SHOW_MORE_USERS: {
            const {payload} = action
            return {
                ...state,
                users: [...state.users, ...payload.users]
            }
        }
        case FOLLOW_USER: {
            const {payload} = action
            return {
                ...state,
                users: state.users.map(u => u.id === payload.userId ? {...u, followed: true} : u)
            }
        }
        case UNFOLLOW_USER: {
            const {payload} = action
            return {
                ...state,
                users: state.users.map(u => u.id === payload.userId ? {...u, followed: false} : u)
            }
        }
        case SET_CURRENT_PAGE: {
            const {payload} = action
            return {
                ...state,
                currentPage: payload.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            const {payload} = action
            return {
                ...state,
                totalUsersCount: payload.usersQty
            }
        }
        case CHANGE_IS_FETCHING: {
            const {payload} = action
            return {
                ...state,
                isFetching: payload.isFetching
            }
        }
        case SET_FOLLOWING_IN_PROGRESS: {
            const {payload} = action
            return {
                ...state,
                followingInProgress: [...state.followingInProgress, payload.userId],
            }
        }
        case UNSET_FOLLOWING_IN_PROGRESS: {
            const {payload} = action
            return {
                ...state,
                followingInProgress: state.followingInProgress.filter(f => f !== payload.userId),
            }
        }
        default:
            return state;
    }
}


type UsersActionTypes = FollowUserACType |
    UnfollowUserACType |
    SetUsersACType |
    ShowMoreUsersACType |
    SetCurrentPageACType |
    SetTotalUsersCountACType |
    ChangeIsFetchingStatusACType |
    SetFollowingInProgressACType |
    UnSetFollowingInProgressACType

export type SetUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: UserType[]) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}

export type ShowMoreUsersACType = ReturnType<typeof showMoreUsersAC>
export const showMoreUsersAC = (users: UserType[]) => {
    return {
        type: SHOW_MORE_USERS,
        payload: {
            users
        }
    } as const
}

export type FollowUserACType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: string) => {
    return {
        type: FOLLOW_USER,
        payload: {
            userId
        }
    } as const
}

export type UnfollowUserACType = ReturnType<typeof unfollowUserAC>
export const unfollowUserAC = (userId: string) => {
    return {
        type: UNFOLLOW_USER,
        payload: {
            userId
        }
    } as const
}

export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export const setCurrentPageAC = (page: number) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: {
            page
        }
    } as const
}


export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export const setTotalUsersCountAC = (usersQty: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        payload: {
            usersQty
        }
    } as const
}

export type ChangeIsFetchingStatusACType = ReturnType<typeof changeIsFetchingStatusAC>
export const changeIsFetchingStatusAC = (isFetching: boolean) => {
    return {
        type: CHANGE_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const
}

export type SetFollowingInProgressACType = ReturnType<typeof setFollowingInProgressAC>
export const setFollowingInProgressAC = (userId: string) => {
    return {
        type: SET_FOLLOWING_IN_PROGRESS,
        payload: {
            userId,
        }
    } as const
}

export type UnSetFollowingInProgressACType = ReturnType<typeof unSetFollowingInProgressAC>
export const unSetFollowingInProgressAC = (userId: string) => {
    return {
        type: UNSET_FOLLOWING_IN_PROGRESS,
        payload: {
            userId,
        }
    } as const
}


// THUNK CREATORS

export const getUsersThunkCreator = (pageSize: number, page: number) => {
    return (dispatch: Dispatch) => {
        dispatch(changeIsFetchingStatusAC(true));

        usersAPI.getUsers(pageSize, page)
            .then((data) => {
                dispatch(setUsersAC(data.items));
                dispatch(setTotalUsersCountAC(data.totalCount));
                dispatch(changeIsFetchingStatusAC(false));
            });
    }
}

export const getUsersForShowMoreThunkCreator = (pageSize: number, page: number) => {
    return (dispatch: Dispatch) => {
        usersAPI.getUsers(pageSize, page)
            .then((data) => {
                dispatch(showMoreUsersAC(data.items));
            });
    }
}

export const setUserAsFollowedAtServerAndSetFollowedInUserStateThunkCreator = (userId: string, isAuthorized: boolean) => {
    return (dispatch: Dispatch) => {
        if (isAuthorized) {
            dispatch(setFollowingInProgressAC(userId));

            usersAPI.followUser(userId)
                .then((data) => {
                    if (data.resultCode === 0) {
                        dispatch(followUserAC(userId));
                    }
                    dispatch(unSetFollowingInProgressAC(userId));
                });
        }
    }
}

export const setUserAsUnFollowedAtServerAndSetUnFollowedInUserStateThunkCreator = (userId: string, isAuthorized: boolean) => {
    return (dispatch: Dispatch) => {
        if (isAuthorized) {
            dispatch(setFollowingInProgressAC(userId));

            usersAPI.unfollowUser(userId)
                .then((data) => {
                    if (data.resultCode === 0) {
                        dispatch(unfollowUserAC(userId));
                    }
                    dispatch(unSetFollowingInProgressAC(userId));
                });
        }
    }
}