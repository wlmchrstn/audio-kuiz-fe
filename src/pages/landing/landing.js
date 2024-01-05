import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './landing.module.scss';

// Components
import Button from '../../components/button/button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.root}>
      <div className={styles.bg} />
      <div className={styles.container}>
        <div className={styles.header} />
        <div className={styles.wrapper}>
          <Button type={"button"} onClick={() => navigate('/student-login')} variant={'secondary'}>
            {'Login as Student'}
          </Button>
          <Button type={"button"} onClick={() => navigate('/teacher-login')} variant={'secondary'}>
            {'Login as Teacher'}
          </Button>
          <Button type={"button"} onClick={() => navigate('/admin-login')} variant={'secondary'}>
            {'Login as Admin'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
