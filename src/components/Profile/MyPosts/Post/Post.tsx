import React, {FC} from 'react';
import S from './Post.module.css';

type PostProps = {
    message: string
    likes: number
}

export const Post: FC<PostProps> = (props) => {
    return (
        <div className={S.wrapper}>
            <img src={'https://iconape.com/wp-content/png_logo_vector/avatar-9.png'} alt={'avatar-post'}/>
            <p className={S.item}>{props.message}</p>
            <p>likes: {props.likes}</p>
        </div>

    );
};