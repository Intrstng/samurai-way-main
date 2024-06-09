import React, { FC } from 'react';
import S from './Users.module.css';
import { UserType } from '../../redux/users-reducer';
import { User } from '../User/User';


type UsersPresentationComponentType = {
  users: UserType[]
  totalUsersCount: number
  currentPage: number
  pageSize: number
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  fetchUsers: (page: number) => void
  fetchUsersToShowMore: () => void
  setCurrentPage: (page: number) => void
}

export const UsersPresentationComponent: FC<UsersPresentationComponentType> = (props) => {
  const totalQtyOfPages = Math.ceil(props.totalUsersCount / props.pageSize);

  const getPaginationLinks = (currentPage: number, totalPages: number): number[] => {
    const VISIBLE_PAGES = 10;
    const middlePages = Math.floor(VISIBLE_PAGES / 2);
    let start = currentPage - middlePages;
    let end = currentPage + middlePages;

    if (start < 1) {
      start = 1;
      end = VISIBLE_PAGES;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - VISIBLE_PAGES + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const pageLinks = getPaginationLinks(props.currentPage, totalQtyOfPages);

  const onClickSetPageHandler = (page: number): void => {
    props.setCurrentPage(page);
    // 'page' instead of 'this.props.currentPage' in page query parameter
    props.fetchUsers(page);
  };

  const onClickPrevPageHandler = () => {
    const prevPage = props.currentPage - 1;
    onClickSetPageHandler(prevPage);
  };

  const onClickNextPageHandler = () => {
    const nextPage = props.currentPage + 1;
    onClickSetPageHandler(nextPage);
  };

  const onClickShowMoreUsersHandler = () => {
    props.fetchUsersToShowMore();
  }

  return (
    <div className={S.users}>
      <div className={S.users__paginationControls}>
        <button disabled={props.currentPage === 1} onClick={onClickPrevPageHandler}>
          Previous
        </button>
        <div className={S.users__paginationPages}>
          {pageLinks.map((p) => (
            <span
              key={p}
              className={p === props.currentPage ? S.users__selectedPage : S.users__page}
              onClick={() => onClickSetPageHandler(p)}
            >
                {p}
              </span>
          ))}
        </div>
        <button
          disabled={props.currentPage === totalQtyOfPages}
          onClick={onClickNextPageHandler}
        >
          Next
        </button>
      </div>
      <span className={S.users__pageTotalCounter}>page from {totalQtyOfPages}</span>
      <div className={S.users__list}>
        {props.users.map((u: UserType) => (
          <User
            key={u.id}
            userId={u.id}
            status={u.status}
            name={u.name}
            followed={u.followed}
            avatar={u.photos.small}
            unfollowUser={props.unfollowUser}
            followUser={props.followUser}
          />
        ))}
      </div>
      <button className={S.users__controls} onClick={onClickShowMoreUsersHandler}>
        Show more
      </button>
    </div>
  );
};