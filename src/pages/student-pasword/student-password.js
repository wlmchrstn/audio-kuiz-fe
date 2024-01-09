import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './student-password.module.scss';

// Components
import Notification from '../../components/notification/notification';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Input from '../../components/input/input';

// Actions
import { changePasswordStudent } from '../../stores/actions/ActionStudent';

const StudentPasswordPage = () => {
  const [view, setView] = useState('password');
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ReducerStudent = useSelector(state => state.ReducerStudent);
  const { teacher_id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleChangePassword = async (data) => {
    dispatch(changePasswordStudent(teacher_id, data, setNotification, setView));
  };

  return (
    <section className={styles.root}>
      <Notification
        message={ReducerTeacher.message}
        variant={ReducerTeacher.messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <div className={styles.content}>
        {view === 'password' ? (
          <>
            <Title tagElement={'h1'} variant={'heading-1'} weight={'medium'}>{'Change Your Password'}</Title>
            <form className={styles.form} onSubmit={handleSubmit(handleChangePassword)}>
              <div className={styles['form-field']}>
                <Paragraph variant={'body-2'}>{'Password'}</Paragraph>
                <Input>
                  <input type={'password'} placeholder={'Password'} {...register('password', { required: true })} />
                </Input>
                {errors.password && errors.password.type === 'required' && (
                  <p className={styles.error}>*Required field*</p>
                )}
              </div>
              <div className={styles['form-field']}>
                <Paragraph variant={'body-2'}>{'Confirm Password'}</Paragraph>
                <Input>
                  <input type={'password'} placeholder={'Confirm Passowrd'} {...register('confirm_password', { required: true })} />
                </Input>
                {errors.confirm_password && errors.confirm_password.type === 'required' && (
                  <p className={styles.error}>*Required field*</p>
                )}
              </div>
              <Button variant={'primary'} type={'submit'}>
                {ReducerStudent.buttonLoading ? (
                  <Spinner variant={'button'} />
                ) : (
                  'Change Password'
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <Title tagElement={'h1'} variant={'heading-1'} weight={'medium'}>{'Password Updated!'}</Title>
            <Button variant={'primary'} type={'button'} onClick={() => navigate('/student-login', { replace: true })}>{'Click here to login as Student'}</Button>
          </>
        )}
      </div>
    </section>
  );
};

export default StudentPasswordPage;
