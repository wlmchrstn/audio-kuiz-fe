import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './admin-navbar.module.scss';

// Icons
import { ReactComponent as UserLogo } from '../../assets/icons/fi_user.svg';
import { ReactComponent as PowerLogo } from '../../assets/icons/fi_power.svg';

const AdminNavbar = ({ view, setView }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={classNames(styles['nav-item'], view === 'Teacher' ? styles.selected : null)} onClick={() => setView('Teacher')}>
        <UserLogo stroke='#bcccdc' />
        <p>{'Teacher'}</p>
      </div>
      <div className={classNames(styles['nav-item'], view === 'Student' ? styles.selected : null)} onClick={() => setView('Student')}>
        <UserLogo stroke='#bcccdc' />
        <p>{'Student'}</p>
      </div>
      <div className={classNames(styles['nav-item'], view === 'Major' ? styles.selected : null)} onClick={() => setView('Major')}>
        <UserLogo stroke='#bcccdc' />
        <p>{'Major'}</p>
      </div>
      <div className={classNames(styles['nav-item'], view === 'Logout' ? styles.selected : null)} onClick={() => handleLogout()}>
        <PowerLogo stroke='#bcccdc' />
        <p>{'Logout'}</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
