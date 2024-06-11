import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SHOW_MORE_USERS = 'SHOW-MORE-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const CHANGE_IS_FETCHING = 'CHANGE-IS-FETCHING';
const CHANGE_FOLLOWING_IN_PROGRESS = 'CHANGE-FOLLOWING-IN-PROGRESS';

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
  users:  UserType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: boolean
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
  followingInProgress: false
}

export const usersReducer = (state: UserStateType = initialUsersState, action: UsersActionTypes): UserStateType => {
  const { type } = action
  switch (type) {
    case SET_USERS: {
      const { payload } = action
      return {
        ...state,
        users: payload.users
      }
    }
    case SHOW_MORE_USERS: {
      const { payload } = action
      return {
        ...state,
        users: [...state.users, ...payload.users]
      }
    }
    case FOLLOW_USER: {
      const { payload } = action
      return {
        ...state,
        users: state.users.map(u => u.id === payload.userId ? {...u, followed: true} : u)
      }
    }
    case UNFOLLOW_USER: {
      const { payload } = action
      return {
        ...state,
        users: state.users.map(u => u.id === payload.userId ? {...u, followed: false} : u)
      }
    }
    case SET_CURRENT_PAGE: {
      const { payload } = action
      return {
        ...state,
        currentPage: payload.page
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      const { payload } = action
      return {
        ...state,
        totalUsersCount: payload.usersQty
      }
    }
    case CHANGE_IS_FETCHING: {
      const { payload } = action
      return {
        ...state,
        isFetching: payload.isFetching
      }
    }
    case CHANGE_FOLLOWING_IN_PROGRESS: {
      const { payload } = action
      return {
        ...state,
        followingInProgress: payload.inProgress
      }
    }
    default: return state;
  }
}


type UsersActionTypes = FollowUserACType |
                        UnfollowUserACType |
                        SetUsersACType |
                        ShowMoreUsersACType |
                        SetCurrentPageACType |
                        SetTotalUsersCountACType |
                        ChangeIsFetchingStatusACType |
                        ChangeFollowingInProgressACType

export type SetUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users:  UserType[]) => {
  return {
    type: SET_USERS,
    payload: {
      users
    }
  } as const
}

export type ShowMoreUsersACType = ReturnType<typeof showMoreUsersAC>
export const showMoreUsersAC = (users:  UserType[]) => {
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

export type ChangeFollowingInProgressACType = ReturnType<typeof changeFollowingInProgressAC>
export const changeFollowingInProgressAC = (inProgress: boolean) => {
  return {
    type: CHANGE_FOLLOWING_IN_PROGRESS,
    payload: {
      inProgress
    }
  } as const
}

