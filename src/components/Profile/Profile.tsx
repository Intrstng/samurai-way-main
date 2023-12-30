import React from 'react';
import S from './Profile.module.css';

export const Profile = () => {
    return (
        <div className={S.content}>
            <div>
                <img src={'https://live.staticflickr.com/6143/5956472201_d5ab929070_c.jpg'} alt={'nature'}/>
            </div>

            <div>
                <img width="100" height="100" src={'https://thumbs.dreamstime.com/z/beautiful-pleased-smiling-cartoon-brunette-girl-dark-chocolate-hair-portrait-isolated-white-background-beautiful-pleased-188685252.jpg?w=768'} alt={'avatar'}/>
                <div>
                    <p>Andrei B</p>
                    <p>Date of birth:</p>
                    <p>City:</p>
                    <p>Education:</p>
                    <p>Web Site:</p>
                </div>
            </div>

            <div>
                <h2>My posts</h2>
                <textarea id="postText" name="postText"></textarea>
                <button>Send</button>
            </div>

            <div className={S.posts}>
                <p className={S.item}>Post 1</p>
                <p className={S.item}>Post 2</p>
            </div>
        </div>
    );
};