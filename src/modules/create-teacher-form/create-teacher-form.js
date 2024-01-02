import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './create-teacher-form.module.scss';

import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';

// Components
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { createTeacher } from '../../stores/actions/ActionTeacher';

const CreateTeacherForm = ({ setIsOpen, setNotification, setRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerTeacher);

  const handleForm = async (data) => dispatch(createTeacher(data, setIsOpen, setNotification, setRefresh, navigate));
  return (
    <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Nama Lengkap'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={'Nama Lengkap'} {...register('name', { required: true })} />
        </Input>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Email'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={'Email'} {...register('email', { required: true })} />
        </Input>
        {errors.email && errors.email.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Password'}</Paragraph>
        <Input>
          <input type={'password'} placeholder={'Password'} {...register('password', { required: true })} />
        </Input>
        {errors.password && errors.password.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Tambahkan Dosen'}
      </Button>
    </form>
  )
};

export default CreateTeacherForm;
