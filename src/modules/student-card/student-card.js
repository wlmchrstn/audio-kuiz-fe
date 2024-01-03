import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './student-card.module.scss';

import { ReactComponent as UserIcon } from '../../assets/icons/fi_user.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/fi_trash.svg';

// Actions
import { deleteStudent } from '../../stores/actions/ActionStudent';

const StudentCard = ({ value, notification, refresh }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("Hapus mahasiswa?") === true) {
      return dispatch(deleteStudent(id, notification, refresh, navigate));
    } else {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <UserIcon stroke='#fff' />
      <div className={styles.wrapper}>
        <p>{value.name}</p>
        <p>{value.nim}</p>
        <p>{value.email}</p>
        <p>{value.prodi}</p>
        <p>{value.status}</p>
      </div>
      <div className={styles.cta} onClick={() => handleDelete(value._id)}>
        <DeleteIcon stroke='#fff' />
      </div>
    </div>
  );
};

export default StudentCard;
