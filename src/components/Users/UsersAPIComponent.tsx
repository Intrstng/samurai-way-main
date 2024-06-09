import React from 'react';
// import S from './Users.module.css';
// import { User } from '../User/User';
// import axios from 'axios';
// import { showMoreUsersAC, UserType } from '../../redux/users-reducer';
//
// interface UsersProps {
//   users: UserType[];
//   pageSize: number;
//   totalUsersCount: number;
//   currentPage: number;
//   setUsers: (users: UserType[]) => void;
//   showMoreUsers: (users: UserType[]) => void;
//   unfollowUser: (userId: string) => void;
//   followUser: (userId: string) => void;
//   setCurrentPage: (page: number) => void;
//   setTotalUsersCount: (usersQty: number) => void;
// }
//
// export class UsersC extends React.Component<UsersProps, {}> {
//   private getPaginationLinks(currentPage: number, totalPages: number): number[] {
//     const VISIBLE_PAGES = 10;
//     const middlePages = Math.floor(VISIBLE_PAGES / 2);
//     let start = currentPage - middlePages;
//     let end = currentPage + middlePages;
//
//     if (start < 1) {
//       start = 1;
//       end = VISIBLE_PAGES;
//     }
//
//     if (end > totalPages) {
//       end = totalPages;
//       start = totalPages - VISIBLE_PAGES + 1;
//     }
//
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   }
//
//   componentDidMount() {
//     this.fetchUsers(this.props.currentPage);
//   }
//
//   onClickSetPageHandler = (page: number): void => {
//     this.props.setCurrentPage(page);
//     // 'page' instead of 'this.props.currentPage' in page query parameter
//     this.fetchUsers(page);
//   };
//
//   onClickPrevPageHandler = () => {
//     const prevPage = this.props.currentPage - 1;
//     this.onClickSetPageHandler(prevPage);
//   };
//
//   onClickNextPageHandler = () => {
//     const nextPage = this.props.currentPage + 1;
//     this.onClickSetPageHandler(nextPage);
//   };
//   // Needs to be refactored
//   onClickShowMoreUsersHandler = () => {
//     axios
//       .get(
//         `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage + 1}`
//       )
//       .then((response) => {
//         this.props.showMoreUsers(response.data.items);
//       });
//   }
//
//   fetchUsers = (page: number) => {
//     axios
//       .get(
//         `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`
//       )
//       .then((response) => {
//         this.props.setUsers(response.data.items);
//         this.props.setTotalUsersCount(response.data.totalCount);
//       });
//   };
//
//   render() {
//     const totalQtyOfPages = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
//     const pageLinks = this.getPaginationLinks(this.props.currentPage, totalQtyOfPages);
//
//     return (
//       <div className={S.users}>
//         <div className={S.users__paginationControls}>
//           <button disabled={this.props.currentPage === 1} onClick={this.onClickPrevPageHandler}>
//             Previous
//           </button>
//           <div className={S.users__paginationPages}>
//             {pageLinks.map((p) => (
//               <span
//                 key={p}
//                 className={p === this.props.currentPage ? S.users__selectedPage : S.users__page}
//                 onClick={() => this.onClickSetPageHandler(p)}
//               >
//                 {p}
//               </span>
//             ))}
//           </div>
//           <button
//             disabled={this.props.currentPage === totalQtyOfPages}
//             onClick={this.onClickNextPageHandler}
//           >
//             Next
//           </button>
//         </div>
//         <span className={S.users__pageTotalCounter}>(from {totalQtyOfPages})</span>
//         <div className={S.users__list}>
//           {this.props.users.map((u: UserType) => (
//             <User
//               key={u.id}
//               userId={u.id}
//               status={u.status}
//               name={u.name}
//               followed={u.followed}
//               avatar={u.photos.small}
//               unfollowUser={this.props.unfollowUser}
//               followUser={this.props.followUser}
//             />
//           ))}
//         </div>
//         <button className={S.users__controls} onClick={this.onClickShowMoreUsersHandler}>
//           Show more
//         </button>
//       </div>
//     );
//   }
// }