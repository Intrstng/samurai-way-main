import React, {FC} from 'react';
import S from './Message.module.css';

type MessageItemProps = {
    id: string
    message: string
}
export const Message: FC<MessageItemProps> = (props) => {
    return <p className={S.message}>{props.message}</p>
}