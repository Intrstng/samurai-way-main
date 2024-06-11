import React from 'react';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { Header } from './Header';
import {
    AuthStateType,
    setAuthUserDataAC,
    setAvatarFromCurrentUsersProfileToAuthUserDataAC
} from '../../redux/auth-reducer';
import { profileAPI, userAuthAPI } from '../../api/api';


export class HeaderAPIContainer extends React.Component<HeaderAuthProps, {}> {
    componentDidMount() {
        this.getAuthUserData();
    }

    getAuthUserData = () => {
        // this.props.changeIsFetchingStatus(true);
        userAuthAPI.authUser()
            .then((response) => {
                if (response.resultCode === 0) { // 0 - means that Authorization is successful
                    this.props.setAuthUserData(response.data) // {userId (id), email, login}

                    // Set avatar from loaded current users profile to users auth data
                    return profileAPI.getUsersProfile(response.data.id)
                }
            })
            .then((data) => {
                this.props.setAvatarFromCurrentUsersProfileToAuthUserData(data.photos.small);
            })
    }
    // this.props.changeIsFetchingStatus(false);

    render() {
        return <Header {...this.props}/>
    }
}


export  type HeaderAuthProps = HeaderMapStatePropsType & HeaderMapDispatchToPropsType

export type HeaderMapStatePropsType = {
    login: string | null
    isAuth: boolean
    avatar: string | null
}

let mapStateToProps = (state: AppRootStateType): HeaderMapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        avatar: state.auth.avatar,
    }
}

export type HeaderMapDispatchToPropsType = {
    setAuthUserData: (authData: Omit<AuthStateType, 'isFetching'>) => void
    setAvatarFromCurrentUsersProfileToAuthUserData: (avatarFromProfile: string | null) => void
}

export const HeaderContainer = connect<HeaderMapStatePropsType, HeaderMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    setAuthUserData: setAuthUserDataAC,
    setAvatarFromCurrentUsersProfileToAuthUserData: setAvatarFromCurrentUsersProfileToAuthUserDataAC,
})(HeaderAPIContainer)