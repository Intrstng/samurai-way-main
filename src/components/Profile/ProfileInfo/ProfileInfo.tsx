import S from './ProfileInfo.module.css';
import React, { FC } from 'react';
import { ProfileType } from '../../../redux/profile-reducer';
import defaultUserAvatar from '../../../assets/images/User_default-avatar.png';
import { Preloader } from '../../Preloader/Preloader';
import { ProfileStatus } from '../../ProfileStatus/ProfileStatus';

type ProfileInfoProps = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ profile,
                                                    status,
                                                    updateStatus }) => {
  if (!profile) {
    return <Preloader/>
  }

  const {
    userId,
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    contacts,
    photos,
    aboutMe
  } = profile

    const lookingForAJobNode = lookingForAJob && lookingForAJobDescription ?
                               <p>Looking for a job: <span>{lookingForAJobDescription}</span></p>
                               : null;

    const contactsNode = <>
      <p className={S.title}>Contacts:</p>
        {contacts.facebook ? <p>Facebook: <a href={contacts.facebook} target={'_blank'}>{contacts.facebook}</a></p> : null}
        {contacts.website ? <p>Website: <a href={contacts.website} target={'_blank'}>{contacts.website}</a></p> : null}
        {contacts.instagram ? <p>Instagram: <a href={contacts.instagram} target={'_blank'}>{contacts.instagram}</a></p> : null}
        {contacts.github ? <p>GitHub: <a href={contacts.github} target={'_blank'}>{contacts.github}</a></p> : null}
        {contacts.vk ? <p>VK: <a href={contacts.vk} target={'_blank'}>{contacts.vk}</a></p> : null}
        {contacts.twitter ? <p>Twitter: <a href={contacts.twitter} target={'_blank'}>{contacts.twitter}</a></p> : null}
        {contacts.mainLink ? <p>MainLink: <a href={contacts.mainLink} target={'_blank'}>{contacts.mainLink}</a></p> : null}
    </>
    return (
        <>
            {/*<img className={S.wallpaper} src={'https://live.staticflickr.com/6143/5956472201_d5ab929070_c.jpg'} alt={'nature'}/>*/}
            <div className={S.descriptionBlock}>
                <img className={S.avatarImg} src={photos.small ? photos.small : defaultUserAvatar} alt={'avatar'}/>
                <div className={S.info}>
                    <p>{fullName}</p>
                    <ProfileStatus status={status}
                                   updateStatus={updateStatus}
                    />
                    {lookingForAJobNode}
                    <p>About me: <span>{aboutMe}</span></p>
                    {contactsNode}
                </div>
            </div>
        </>
    )
}