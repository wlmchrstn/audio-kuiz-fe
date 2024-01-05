import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './create-student-form.module.scss';

import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';

// Components
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { createStudent } from '../../stores/actions/ActionStudent';

const CreateStudentForm = ({ setIsOpen, setNotification, setRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerTeacher);

  const handleForm = async (data) => dispatch(createStudent(data, setIsOpen, setNotification, setRefresh, navigate));
  return (
    <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Full Name'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={'Full Name'} {...register('name', { required: true })} />
        </Input>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'NIM'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={'NIM'} {...register('nim', { required: true })} />
        </Input>
        {errors.nim && errors.nim.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Major'}</Paragraph>
        <Input>
          <select {...register('prodi', { required: true })}>
            <option value={'Seni Tari'}>{'Seni Tari'}</option>
            <option value={'Seni Musik'}>{'Seni Musik'}</option>
            <option value={'Manajemen'}>{'Manajemen'}</option>
            <option value={'Akuntansi'}>{'Akuntansi'}</option>
            <option value={'Pendidikan Bahasa Mandarin'}>{'Pendidikan Bahasa Mandarin'}</option>
            <option value={'Teknik Perangkat Lunak'}>{'Teknik Perangkat Lunak'}</option>
            <option value={'Teknik Informatika'}>{'Teknik Informatika'}</option>
            <option value={'Sistem Informasi'}>{'Sistem Informasi'}</option>
            <option value={'Teknik Lingkungan'}>{'Teknik Lingkungan'}</option>
            <option value={'Teknik Industri'}>{'Teknik Industri'}</option>
          </select>
        </Input>
        {errors.prodi && errors.prodi.type === 'required' && (
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
        {buttonLoading ? <Spinner variant={'button'} /> : 'Tambahkan Mahasiswa'}
      </Button>
    </form>
  );
};

export default CreateStudentForm;
