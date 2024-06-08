import React, { FC } from 'react';
import S from '../Card/Card.module.css';

type CardProps = {
  name: string
  status: string
}

export const Card: FC<CardProps> = ({
                       name,
                       status
                     }
) => {
  return (
    <div className={S.card}>
        <div className={S.card__head}>
            <p className={S.card__name}>{name}</p>
            {/*<p className={S.card__country}>{country}</p>*/}
            {/*<p className={S.card__city}>{city}</p>*/}
        </div>
            <div className={S.card__status}>
                <p>{status}</p>
            </div>
    </div>
  );
};