import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './teacher-edit-form.module.scss';

// Components
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';

// Actions
import { updateTeacher } from '../../stores/actions/ActionTeacher';

const TeacherEditForm = ({ setIsOpen, setNotification, setRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerTeacher);

  const handleForm = async (data) => dispatch(updateTeacher(data, setIsOpen, setNotification, setRefresh, navigate));

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
      <div className={styles['form-field']}>
        <Input>
          <input type={'text'} placeholder={'Name'} {...register('name', { required: true })} />
        </Input>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Input>
          <input type={'email'} placeholder={'Email'} {...register('email', { required: true })} />
        </Input>
        {errors.email && errors.email.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Update'}
      </Button>
    </form>
  );
};

export default TeacherEditForm;
