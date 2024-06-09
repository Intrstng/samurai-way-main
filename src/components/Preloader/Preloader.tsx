import React, { FC } from 'react';
import S from './Preloader.module.css';
import loadingSpinner from '../../assets/images/Loading_spinner.gif';


export const Preloader = () => {
  return <img className={S.spinner} src={loadingSpinner} alt={'loading'}/>
};