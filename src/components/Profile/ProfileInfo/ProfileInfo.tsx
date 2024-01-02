import S from './ProfileInfo.module.css';
import React from 'react';

export const ProfileInfo = () => {
    return (
        <>
            <img src={'https://live.staticflickr.com/6143/5956472201_d5ab929070_c.jpg'} alt={'nature'}/>

            <div className={S.descriptionBlock}>
                <img src={'https://thumbs.dreamstime.com/z/beautiful-pleased-smiling-cartoon-brunette-girl-dark-chocolate-hair-portrait-isolated-white-background-beautiful-pleased-188685252.jpg?w=768'} alt={'avatar'}/>
                <div className={S.info}>
                    <p>Geri Halliwell</p>
                    <p>Date of birth:</p>
                    <p>City:</p>
                    <p>Education:</p>
                    <p>Web Site:</p>
                </div>
            </div>
        </>
    )
}