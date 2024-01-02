import React from 'react';
import styles from './teacher-card.module.scss';

import { ReactComponent as UserIcon } from '../../assets/icons/fi_user.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/fi_trash.svg';

const TeacherCard = ({ value }) => {
  return (
    <div className={styles.container}>
      <UserIcon stroke='#fff' />
      <div className={styles.wrapper}>
        <p>{value.name}</p>
        <p>{value.email}</p>
        <p>{value.status}</p>
      </div>
      <div className={styles.cta}>
        <DeleteIcon stroke='#fff' />
      </div>
    </div>
  );
};

export default TeacherCard;
