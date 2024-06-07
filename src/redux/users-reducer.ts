import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET_USERS'

export type UserType = {
  id: string
  name: string
  status: string
  location: {
    country: string
    city: string
  }
  followed: boolean
  avatar: string
}

export type UserStateType = {
  users:  UserType[]
}
// avatars: https://icons8.ru/icons/set/avatars
const initialUsersState: UserStateType = {
  users: [
    // {id: v1(), status: 'Married', name: 'Doctor', location: {country: 'Belgium', city: 'Gant'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=hdOTX4S6VF7r&format=png&color=000000'},
    // {id: v1(), status: 'Married', name: 'Lawyer', location: {country: 'Canada', city: 'Toronto'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=lehomL5GkqeO&format=png&color=000000'},
    // {id: v1(), status: 'Single', name: 'Support', location: {country: 'Germany', city: 'Baden-Baden'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=FzR2LK6FnqKI&format=png&color=000000'},
    // {id: v1(), status: 'Married', name: 'Pilot', location: {country: 'Slovakia', city: 'Zhilina'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=nsdyNwmAYXWH&format=png&color=000000'},
  ]
}

export const usersReducer = (state: UserStateType = initialUsersState, action: UsersActionTypes): UserStateType => {
  const { type } = action
  switch (type) {
    case SET_USERS: {
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


type UsersActionTypes = FollowUserACType | UnfollowUserACType | SetUsersACType

export type SetUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users:  UserType[]) => {
  return {
    type: SET_USERS,
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