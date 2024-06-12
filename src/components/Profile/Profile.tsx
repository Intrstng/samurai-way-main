import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { getCurrentUserProfileThunkCreator, ProfileType } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { sendMessageAC, updateNewMessageBodyAC } from '../../redux/dialogs-reducer';
import { Dialogs } from '../Dialogs/Dialogs';


export const Profile = (props: ProfileAPIContainerProps) => {
    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </>
    );
};

export class ProfileAPIContainer extends React.Component<ProfileAPIContainerProps, {}> {
    componentDidMount() {
        this.getCurrentUserProfile();
    }

    getCurrentUserProfile() {
        let userId = this.props.match.params.userId; // is taken from router params (thanks to WithUrlDataContainerComponent = withRouter(ProfileAPIContainer) - it gives access to router params)
        if (!userId) {
            userId = '2'; // OPENS PAGE BY DEFAULT
        }
        this.props.getCurrentUserProfile(userId);
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}


export type ProfileMapStateToPropsType = {
    profile: ProfileType
}

let mapStateToProps = (state: AppRootStateType): ProfileMapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

export type ProfileMapDispatchToPropsType = {
    getCurrentUserProfile: (userId: string) => void
}


// type ProfileAPIContainerProps = ProfileMapStateToPropsType & ProfileMapDispatchToPropsType
type ProfileAPIContainerProps = ProfileMapStateToPropsType &
    ProfileMapDispatchToPropsType &
    RouteComponentProps<{ userId?: string }>;


// // Before:
// // It gives access to router params in class component
// let WithUrlDataContainerComponent = withRouter(ProfileAPIContainer) // To have access to URL router params we are wrapping ProfileAPIContainer in HOC withRouter()
// export const ProfileContainer = WithAuthRedirect(connect<ProfileMapStateToPropsType, ProfileMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
//     getCurrentUserProfile: getCurrentUserProfileThunkCreator,
// })(WithUrlDataContainerComponent))


// After:
export default compose<React.ComponentType>(
    connect<ProfileMapStateToPropsType, ProfileMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
            getCurrentUserProfile: getCurrentUserProfileThunkCreator,
        }),

        withRouter,
        WithAuthRedirect
)(ProfileAPIContainer)