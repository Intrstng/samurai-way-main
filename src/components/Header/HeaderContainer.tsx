import React from 'react';
import axios from 'axios';
import { Preloader } from '../Preloader/Preloader';
import { UsersPresentationComponent } from '../Users/UsersPresentationComponent';
import {
  changeIsFetchingStatusAC,
  followUserAC, setCurrentPageAC, setTotalUsersCountAC,
  setUsersAC,
  showMoreUsersAC,
  unfollowUserAC,
  UserStateType,
  UserType
} from '../../redux/users-reducer';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { UsersAPIComponent, UsersProps } from '../Users/UsersContainer';
import { Header } from './Header';
import { AuthStateType, setAuthUserDataAC } from '../../redux/auth-reducer';


export class HeaderAPIContainer extends React.Component<HeaderAuthProps, {}> {
  componentDidMount() {
    this.getAuthUserData();
  }

  getAuthUserData = () => {
    // this.props.changeIsFetchingStatus(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/auth/me`,
        {
          withCredentials: true
        }
      )
      .then((response) => {
        if (response.data.resultCode === 0) { // 0 - means that Authorization is successful
          this.props.setAuthUserData(response.data.data) // {userId, email, login}
        }

        // this.props.changeIsFetchingStatus(false);
      });
  };


  render() {
    return <Header {...this.props}/>
  }
}


export  type HeaderAuthProps = Omit<AuthStateType, 'id' | 'email'> & HeaderMapDispatchToPropsType

let mapStateToProps = (state: AppRootStateType): Omit<AuthStateType, 'id' | 'email'> => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}

export type HeaderMapDispatchToPropsType = {
  setAuthUserData: (authData: Omit<AuthStateType, 'isFetching'>) => void
}

export const HeaderContainer = connect<Omit<AuthStateType, 'id' | 'email'> , HeaderMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps,  {
  setAuthUserData: setAuthUserDataAC
})(HeaderAPIContainer)