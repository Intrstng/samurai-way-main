import { Redirect } from 'react-router-dom';
import React, { ComponentType } from 'react';
import { AppRootStateType } from '../redux/redux-store';
import { connect } from 'react-redux';

export type MapStateToPropsForRedirectType = {
    isCurrentUserAuthorized: boolean
}

let mapStateToPropsForRedirect = (state: AppRootStateType): MapStateToPropsForRedirectType => {
    return {
        isCurrentUserAuthorized: state.auth.isAuth,
    }
}

// In arrow function and later use <T,> (with comma)
export const WithAuthRedirect = <T,>(Component: ComponentType<T>) => {
    const RedirectComponent = (props: MapStateToPropsForRedirectType) => {
        let {isCurrentUserAuthorized, ...restProps} = props

        if (!isCurrentUserAuthorized) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T}/> // or: {...restProps as T & {}}
    }

    let ConnectedAuthRedirectComponent = connect<MapStateToPropsForRedirectType, {}, {}, AppRootStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}