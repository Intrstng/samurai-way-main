import React, { FC, useEffect } from 'react';
import { User } from '../User/User';
import S from '../Users/Users.module.css';
import { UsersProps } from './UsersContainer';
import { v1 } from 'uuid';
import axios from 'axios';


// export const Users: FC<UsersProps> = ({ users,
//                                         setUsers,
//                                         showMoreUsers,
//                                         unfollowUser,
//                                         followUser
// }) => {
//   // Temporary solution - Preparing for REST
//   useEffect(() => {
//     getUsers();
//   }, [])
//
//   const getUsers = () => {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users')
//       .then(function (response) {
//         setUsers(response.data.items);
//       })
//   }
//
//   const onClickShowMoreUsersHandler = () => {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users')
//       .then(function (response) {
//         showMoreUsers(response.data.items);
//       })
//   }
//
//   return (
//     <div className={S.users}>
//       <div className={S.users__list}>
//         {users.map(u => <User key={u.id}
//                               userId={u.id}
//                               status={u.status}
//                               name={u.name}
//                               followed={u.followed}
//                               avatar={u.photos.small}
//                               unfollowUser={unfollowUser}
//                               followUser={followUser}
//         />)}
//       </div>
//       <button className={S.users__controls} onClick={onClickShowMoreUsersHandler}>Show more</button>
//     </div>
//   );
// };