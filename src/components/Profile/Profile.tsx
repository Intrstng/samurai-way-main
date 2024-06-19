import React from 'react';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {
    getCurrentUserProfileThunkCreator,
    getCurrentUserStatusThunkCreator,
    ProfileType, updateCurrentUserStatusThunkCreator
} from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';


export const Profile = (props: ProfileAPIContainerProps) => {

    return (
        <>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateCurrentUserStatus}
            />
            <MyPostsContainer/>
        </>
    );
};

export class ProfileAPIContainer extends React.Component<ProfileAPIContainerProps, {}> {
    componentDidMount() {
        this.getCurrentUserProfileAndStatus();
    }

    getCurrentUserProfileAndStatus() {
        let userId = this.props.match.params.userId; // is taken from router params (thanks to WithUrlDataContainerComponent = withRouter(ProfileAPIContainer) - it gives access to router params)
        if (!userId) {
            userId = '2'; // OPENS PAGE BY DEFAULT
        }
        this.props.getCurrentUserProfile(userId);
        this.props.getCurrentUserStatus(userId);
    }

    updateCurrentUserStatus(status: string) {
        this.props.updateCurrentUserStatus(status);
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateCurrentUserStatus={this.updateCurrentUserStatus}
        />
    }
}


export type ProfileMapStateToPropsType = {
    profile: ProfileType
    status: string
}

let mapStateToProps = (state: AppRootStateType): ProfileMapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export type ProfileMapDispatchToPropsType = {
    getCurrentUserProfile: (userId: string) => void
    getCurrentUserStatus: (userId: string) => void
    updateCurrentUserStatus: (status: string) => void
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
            getCurrentUserProfile: getCurrentUserStatusThunkCreator,
            getCurrentUserStatus: getCurrentUserProfileThunkCreator,
            updateCurrentUserStatus: updateCurrentUserStatusThunkCreator
        }),
        withRouter,
        WithAuthRedirect
)(ProfileAPIContainer)