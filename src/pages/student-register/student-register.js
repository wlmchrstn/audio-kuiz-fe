import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './student-register.module.scss';

import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';

// Actions
import { registerStudent } from '../../stores/actions/ActionAuth';

const StudentRegisterPage = () => {
  const [notification, setNotification] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, messageStatus } = useSelector(state => state.ReducerAuth);

  const handleRegister = data => dispatch(registerStudent(data, navigate, setNotification));

  return (
    <section className={styles.root}>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Title
            tagElement={'h1'}
            variant={'heading-1'}
            color={'black'}
            weight={'bold'}
          >{'Daftar sebagai mahasiswa'}</Title>
          <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
            <Paragraph variant={'body-2'} className={styles.label}>{'Name'}</Paragraph>
            <Input className={styles.input}>
              <input
                type={'text'}
                name={'name'}
                placeholder={'Nama lengkap'}
                {...register('name', { required: true })}
              />
            </Input>
            {errors.name && errors.name.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>{'Nomor Induk Mahasiswa'}</Paragraph>
            <Input className={styles.input}>
              <input
                type={'text'}
                name={'nim'}
                placeholder={'Nomor Induk Mahasiswa'}
                {...register('nim', { required: true })}
              />
            </Input>
            {errors.nim && errors.nim.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>{'Program Studi'}</Paragraph>
            <Input className={styles.input}>
              <select {...register('prodi', { required: true })}>
                <option value={'Seni Tari'}>{'Seni Tari'}</option>
                <option value={'Seni Musik'}>{'Seni Musik'}</option>
                <option value={'Manajemen'}>{'Manajemen'}</option>
                <option value={'Akuntansi'}>{'Akuntansi'}</option>
                <option value={'Pendidikan Bahasa Mandari'}>{'Pendidikan Bahasa Mandarin'}</option>
                <option value={'Teknik Perangkat Lunak'}>{'Teknik Perangkat Lunak'}</option>
                <option value={'Teknik Informatika'}>{'Teknik Informatika'}</option>
                <option value={'Sistem Informasi'}>{'Sistem Informasi'}</option>
                <option value={'Teknik Lingkungan'}>{'Teknik Lingkungan'}</option>
                <option value={'Teknik Industri'}>{'Teknik Industri'}</option>
              </select>
            </Input>
            {errors.prodi && errors.prodi.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>{'Email'}</Paragraph>
            <Input className={styles.input}>
              <input
                type={'email'}
                name={'email'}
                placeholder={'Contoh: johndee@gmail.com'}
                {...register('email', { required: true })}
              />
            </Input>
            {errors.email && errors.email.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>{'Password'}</Paragraph>
            <Input className={styles.input}>
              <input
                type={'password'}
                name={'password'}
                placeholder={'Masukkan password'}
                {...register('password', { required: true })}
              />
            </Input>
            {errors.password && errors.password.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
            <Button type={'submit'} variant={'primary'}>
              {loading ? <Spinner variant={'button'} /> : 'Daftar'}
            </Button>
          </form>
          <div className={styles.login}>
            <Paragraph variant={'body-2'}>{'Sudah punya akun mahasiswa?'}</Paragraph>
            <Link to={'/student-login'}>{'Masuk di sini'}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentRegisterPage;
