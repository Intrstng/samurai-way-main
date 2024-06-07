import React, { FC } from 'react';
import S from '../User/User.module.css';
import { Card } from '../Card/Card';
import { v1 } from 'uuid';
import { UserType } from '../../redux/users-reducer';


type UserProps = {
  userId: string
  name: string
  status: string
  location: {
    country: string
    city: string
  }
  followed: boolean
  avatar: string
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}

export const User: FC<UserProps> = ({
                                      userId,
                                      name,
                                      status,
                                      location,
                                      followed,
                                      avatar,
                                      followUser,
                                      unfollowUser
}) => {
  const onClickToggleFollowStatus = () => followed
                                          ? unfollowUser(userId)
                                          : followUser(userId)
  const userButtonName = followed
                         ? 'Unfollow'
                         : 'Follow';
  return (
    <div className={S.user}>
      <div className={S.user__avatar}>
        <img className={S.user__photo} src={avatar} alt={name}/>
        <button onClick={onClickToggleFollowStatus}>{userButtonName}</button>
      </div>
      <Card name={name} status={status} location={location}/>
    </div>
  );
};