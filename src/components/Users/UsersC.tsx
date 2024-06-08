import React from 'react';
import S from './Users.module.css';
import { User } from '../User/User';
import axios from 'axios';
import { showMoreUsersAC, UserType } from '../../redux/users-reducer';

interface UsersProps {
  users: UserType[];
  pageSize: number
  totalUsersCount: number
  currentPage: number
  setUsers: (users: UserType[]) => void;
  showMoreUsers: (users: UserType[]) => void
  unfollowUser: (userId: string) => void;
  followUser: (userId: string) => void;
  setCurrentPage: (page: number) => void
  setTotalUsersCount: (usersQty: number) => void
}

export class UsersC extends React.Component<UsersProps, {}> {
  // users: any;
  // setUsers: (users: any) => void;
  // unfollowUser: (userId: string) => void;
  // followUser: (userId: string) => void;
  //
  // constructor(users: any,
  //             setUsers: (users: any) => void,
  //             unfollowUser: (userId: string) => void,
  //             followUser: (userId: string) => void,
  //             props) {
  //   super(props);
  //   this.users = users;
  //   this.setUsers = setUsers;
  //   this.unfollowUser = unfollowUser;
  //   this.followUser = followUser;
  // }

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
      .then(response => {
        this.props.setUsers(response.data.items);
        // !!!!!
        // this.props.setTotalUsersCount(response.data.totalCount);
      })

  }

  onClickShowMoreUsersHandler = () => {
    // !!!!!
    // query params in URL should be changed to have clean console.log
    axios.get('https://social-network.samuraijs.com/api/1.0/users?page=2')
      .then(response => {
        this.props.showMoreUsers(response.data.items)
      })
  }

  onClickSetPageHandler = (page: number): void => {
    this.props.setCurrentPage(page);
    // 'page' instead of 'this.props.currentPage' in page query parameter
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`)
      .then(response => {
        this.props.setUsers(response.data.items);
      })
  }

  render() {
    const totalQtyOfPages = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    const pages = [];

    for (let i = 1; i <= totalQtyOfPages; i++) {
      pages.push(i)
    }


    return (
      <div className={S.users}>
        <div className={S.users__paginationControls}>
          {pages.map(p => <span className={p === this.props.currentPage
                                                  ? S.users__selectedPage
                                                  : S.users__page}
                                onClick={() => this.onClickSetPageHandler(p)}>{p}</span>)}
          <span>{totalQtyOfPages}</span>
        </div>
        <div className={S.users__list}>
          {this.props.users.map((u: UserType) => <User key={u.id}
                                                       userId={u.id}
                                                       status={u.status}
                                                       name={u.name}
                                                       followed={u.followed}
                                                       avatar={u.photos.small}
                                                       unfollowUser={this.props.unfollowUser}
                                                       followUser={this.props.followUser}
          />)}
        </div>
        <button className={S.users__controls} onClick={this.onClickShowMoreUsersHandler}>Show more</button>
      </div>
    );
  }
}