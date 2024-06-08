import React, { FC } from 'react';
import S from '../User/User.module.css';
import { Card } from '../Card/Card';
import avatarDefault from '../../assets/images/Avatar_default.png';


type UserProps = {
  userId: string
  name: string
  status: string
  followed: boolean
  avatar: string | null
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
}

export const User: FC<UserProps> = ({
                                      userId,
                                      name,
                                      status,
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
        {avatar ? <img className={S.user__photo} src={avatar} alt={name}/>
          : <img className={S.user__defaultPhoto} src={avatarDefault} alt={'Default avatar'}/>
        }
        <button onClick={onClickToggleFollowStatus}>{userButtonName}</button>
      </div>
      <Card name={name} status={status}/>
    </div>
  );
};