import React from 'react';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { Header } from './Header';
import { getAuthUserDataThunkCreator } from '../../redux/auth-reducer';


export class HeaderAPIContainer extends React.Component<HeaderAuthProps, {}> {
    componentDidMount() {
        this.getAuthUserData();
    }

    getAuthUserData = () => {
        this.props.getAuthUserData();
    }

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
    getAuthUserData: () => void
}

export const HeaderContainer = connect<HeaderMapStatePropsType, HeaderMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    getAuthUserData: getAuthUserDataThunkCreator,
})(HeaderAPIContainer)