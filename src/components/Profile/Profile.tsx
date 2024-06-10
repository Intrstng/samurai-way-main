import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import axios from 'axios';
import { AppRootStateType } from '../../redux/redux-store';
import { changeIsFetchingStatusAC, UserStateType } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import { ProfileStateType, ProfileType, setUserProfileAC } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';


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
    let userId = this.props.match.params.userId; // is taken from router params (thanks to WithUrlDataContainerComponent = withRouter(ProfileAPIContainer) - it gives access to router params)

    if (!userId) {
      userId = '2';
    }
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
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



// type ProfileAPIContainerProps = ProfileMapStateToPropsType & ProfileMapDispatchToPropsType
type ProfileAPIContainerProps = ProfileMapStateToPropsType &
  ProfileMapDispatchToPropsType &
  RouteComponentProps<{ userId?: string }>;

// It gives access to router params in class component
let WithUrlDataContainerComponent = withRouter(ProfileAPIContainer) // To have access to URL router params we are wrapping ProfileAPIContainer in HOC withRouter()


// export const ProfileContainer = connect<ProfileMapStateToPropsType, ProfileMapDispatchToPropsType, { userId?: string }, AppRootStateType>(mapStateToProps,  {
//   setUserProfile: setUserProfileAC,
// })(WithUrlDataContainerComponent)
export const ProfileContainer = connect<ProfileMapStateToPropsType, ProfileMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps,  {
  setUserProfile: setUserProfileAC,
})(WithUrlDataContainerComponent)