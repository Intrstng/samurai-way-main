import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import axios from 'axios';
import { AppRootStateType } from '../../redux/redux-store';
import { changeIsFetchingStatusAC, UserStateType } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import { ProfileStateType, ProfileType, setUserProfileAC } from '../../redux/profile-reducer';


export const Profile = (props: ProfileAPIContainerProps) => {
    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer  />
        </>
    );
};

export class ProfileAPIContainer extends React.Component<ProfileAPIContainerProps, {}> {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/2` //!!!!!!!!!!!!!!!
      )
      .then((response) => {
       this.props.setUserProfile(response.data);
      });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile}/>
  }
}

type ProfileMapStateToPropsType = {
  profile: ProfileType
}

let mapStateToProps = (state: AppRootStateType): ProfileMapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
  }
}

type ProfileMapDispatchToPropsType = {
  setUserProfile: (profile: ProfileType) => void
}

type ProfileAPIContainerProps = ProfileMapStateToPropsType & ProfileMapDispatchToPropsType

export const ProfileContainer = connect<ProfileMapStateToPropsType, ProfileMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps,  {
  setUserProfile: setUserProfileAC,
})(ProfileAPIContainer)