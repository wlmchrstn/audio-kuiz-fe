import React, { useState, useLayoutEffect }  from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './student-login.module.scss';

// Components
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';
import Button from '../../components/button/button';
import Notification from '../../components/notification/notification';

// Actions
import { loginStudent } from '../../stores/actions/ActionAuth';

const StudentLoginPage = () => {
  const [notification, setNotification] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buttonLoading, message, messageStatus } = useSelector(state => state.ReducerAuth);

  useLayoutEffect(() => {
    const updateScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const handleLogin = async data => {
    dispatch(loginStudent(data, navigate, setNotification));
  };

  return (
    <section className={styles.root}>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <div className={styles.container}>
        {screenSize > 767 ? <div className={styles.image} /> : null}
        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
          <Title
            tagElement={'h1'}
            variant={'heading-1'}
            color={'black'}
            weight={'bold'}
          >{'Masuk sebagai mahasiswa'}</Title>
          <Paragraph variant={'body-2'} className={styles.label}>
            {'NIM'}
          </Paragraph>
          <Input className={styles.input}>
            <input
              type={'text'}
              placeholder={'Masukkan NIM'}
              {...register('nim', { required: true })}
            />
          </Input>
          {errors.nim && errors.nim.type === 'required' && (
            <p className={styles.error}>{'*Required field*'}</p>
          )}
          <Paragraph variant={'body-2'} className={styles.label}>
            {'Password'}
          </Paragraph>
          <Input className={styles.input}>
            <input
              type={'password'}
              placeholder={'Masukkan password'}
              {...register('password', { required: true })}
            />
          </Input>
          {errors.password && errors.password.type === 'required' && (
            <p className={styles.error}>{'*Required field*'}</p>
          )}
          <Button type={'submit'} variant={'primary'} color={'white'}>
            {buttonLoading ? <Spinner variant={'button'} /> : 'Masuk'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default StudentLoginPage;
