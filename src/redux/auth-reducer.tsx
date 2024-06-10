import {v1} from 'uuid';
import {ActionTypes, PostItem} from './state';

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';

export type AuthStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

const initialAuthState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

export const authReducer = (state: AuthStateType = initialAuthState, action: UsersActionTypes): AuthStateType => {
  const { type } = action
  switch (type) {
    case SET_AUTH_USER_DATA: {
      const {payload} = action
      return {
        ...state,
        ...payload.authData,
        isAuth: true,
      }
    }
    default: return state;
  }
}


type UsersActionTypes = SetAuthUserDataACType

export type SetAuthUserDataACType = ReturnType<typeof setAuthUserDataAC>
export const setAuthUserDataAC = (authData: Omit<AuthStateType, 'isFetching'>) => {
  return {
    type: SET_AUTH_USER_DATA,
    payload: {
      authData
    }
  } as const
}
