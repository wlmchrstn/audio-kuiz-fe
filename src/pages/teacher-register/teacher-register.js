import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './teacher-register.module.scss';

import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';

// Actions
import { registerTeacher } from '../../stores/actions/ActionAuth';

const TeacherRegisterPage = () => {
    const [notification, setNotification] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, message, messageStatus } = useSelector(state => state.ReducerAuth);

    const handleRegister = data => {
        dispatch(registerTeacher(data, navigate, setNotification));
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
                <div className={styles.wrapper}>
                    <Title
                        tagElement={'h1'}
                        variant={'heading-1'}
                        color={'black'}
                        weight={'bold'}
                    >
                        {'Daftar sebagai dosen'}
                    </Title>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className={styles.form}
                    >
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Name'}
                        </Paragraph>
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
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Email'}
                        </Paragraph>
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
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Password'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'password'}
                                name={'password'}
                                placeholder={'Masukkan password'}
                                {...register('password', { required: true })}
                            />
                        </Input>
                        {errors.password &&
                            errors.password.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        <Button type={'submit'} variant={'primary'}>
                            {loading ? (
                                <Spinner variant={'button'} />
                            ) : (
                                'Daftar'
                            )}
                        </Button>
                    </form>
                    <div className={styles.login}>
                        <Paragraph variant={'body-2'}>
                            {'Sudah punya akun dosen?'}
                        </Paragraph>
                        <Link to={'/teacher-login'}>{'Masuk di sini'}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeacherRegisterPage;
