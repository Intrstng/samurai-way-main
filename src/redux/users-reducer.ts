import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SHOW_MORE_USERS = 'SHOW-MORE-USERS';

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
}
// avatars: https://icons8.ru/icons/set/avatars
const initialUsersState: UserStateType = {
  users: [
  ]
}

export const usersReducer = (state: UserStateType = initialUsersState, action: UsersActionTypes): UserStateType => {
  const { type } = action
  switch (type) {
    case SET_USERS: {
      const { payload } = action
      return {
        ...state,
        users: [...payload.users]
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
    default: return state;
  }
}


type UsersActionTypes = FollowUserACType | UnfollowUserACType | SetUsersACType | ShowMoreUsersACType

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