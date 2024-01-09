import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './student-navbar.module.scss';

// Icons
import { ReactComponent as BookLogo } from '../../assets/icons/fi_book-open.svg';
import { ReactComponent as UserLogo } from '../../assets/icons/fi_user.svg';
import { ReactComponent as PowerLogo } from '../../assets/icons/fi_power.svg';

const StudentNavbar = ({ view, setView }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={classNames(styles['nav-item'], view === 'Exam' ? styles.selected : null)} onClick={() => setView('Exam')}>
        <BookLogo stroke='#486581' />
        <p>{'Exam'}</p>
      </div>
      <div className={classNames(styles['nav-item'], view === 'Profile' ? styles.selected : null)} onClick={() => setView('Profile')}>
        <UserLogo stroke='#486581' />
        <p>{'Profile'}</p>
      </div>
      <div className={classNames(styles['nav-item'], view === 'Logout' ? styles.selected : null)} onClick={() => handleLogout()}>
        <PowerLogo stroke='#486581' />
        <p>{'Logout'}</p>
      </div>
    </div>
  );
};

export default StudentNavbar;
