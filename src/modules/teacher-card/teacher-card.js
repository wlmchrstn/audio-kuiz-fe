import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './teacher-card.module.scss';

// Assets
import { ReactComponent as UserIcon } from '../../assets/icons/fi_user.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/fi_trash.svg';

// Actions
import { deleteTeacher } from '../../stores/actions/ActionTeacher';

const TeacherCard = ({ value, notification, refresh }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this teacher?") === true) {
      return dispatch(deleteTeacher(id, notification, refresh, navigate));
    } else {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <UserIcon stroke='#fff' />
      <div className={styles.wrapper}>
        <p>{value.name}</p>
        <p>{value.email}</p>
        <p>{value.status}</p>
      </div>
      <div className={styles.cta} onClick={() => handleDelete(value._id)}>
        <DeleteIcon stroke='#fff' />
      </div>
    </div>
  );
};

export default TeacherCard;
