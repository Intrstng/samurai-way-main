import React, { FC, useEffect } from 'react';
import { User } from '../User/User';
import S from '../Users/Users.module.css';
import { UsersProps } from './UsersContainer';
import { v1 } from 'uuid';


export const Users: FC<UsersProps> = ({ users,
                                        setUsers,
                                        unfollowUser,
                                        followUser
}) => {
  // Temporary solution - Preparing for REST
  useEffect(() => {
  setUsers([
      {id: v1(), status: 'Married', name: 'Doctor', location: {country: 'Belgium', city: 'Gant'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=hdOTX4S6VF7r&format=png&color=000000'},
      {id: v1(), status: 'Married', name: 'Lawyer', location: {country: 'Canada', city: 'Toronto'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=lehomL5GkqeO&format=png&color=000000'},
      {id: v1(), status: 'Single', name: 'Support', location: {country: 'Germany', city: 'Baden-Baden'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=FzR2LK6FnqKI&format=png&color=000000'},
      {id: v1(), status: 'Married', name: 'Pilot', location: {country: 'Slovakia', city: 'Zhilina'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=nsdyNwmAYXWH&format=png&color=000000'},
    ]
  )
  }, [])

  const onClickShowMoreUsersHandler = () => {
    // Temporary solution - Preparing for REST
    setUsers([
        {id: v1(), status: 'Married', name: 'Doctor', location: {country: 'Belgium', city: 'Gant'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=hdOTX4S6VF7r&format=png&color=000000'},
        {id: v1(), status: 'Married', name: 'Lawyer', location: {country: 'Canada', city: 'Toronto'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=lehomL5GkqeO&format=png&color=000000'},
        {id: v1(), status: 'Single', name: 'Support', location: {country: 'Germany', city: 'Baden-Baden'}, followed: false, avatar: 'https://img.icons8.com/?size=100&id=FzR2LK6FnqKI&format=png&color=000000'},
        {id: v1(), status: 'Married', name: 'Pilot', location: {country: 'Slovakia', city: 'Zhilina'}, followed: true, avatar: 'https://img.icons8.com/?size=100&id=nsdyNwmAYXWH&format=png&color=000000'},
      ]
    )
  }

  return (
    <div className={S.users}>
      <div className={S.users__list}>
        {users.map(u => <User key={u.id}
                              userId={u.id}
                              status={u.status}
                              location={u.location}
                              name={u.name}
                              followed={u.followed}
                              avatar={u.avatar}
                              unfollowUser={unfollowUser}
                              followUser={followUser}
        />)}
      </div>
      <button className={S.users__controls} onClick={onClickShowMoreUsersHandler}>Show more</button>
    </div>
  );
};