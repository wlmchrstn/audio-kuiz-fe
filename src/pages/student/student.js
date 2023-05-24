import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import styles from './student.module.scss';

// Components
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';

// Actions
import { getStudent, takeStudentExam } from '../../stores/actions/ActionStudent';

const StudentPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [notification, setNotification] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, buttonLoading, message, messageStatus, student, studentExamList } = useSelector(
        state => state.ReducerStudent
    );

    useEffect(() => {
        dispatch(getStudent(setNotification, navigate));
    }, [refresh]);

    const handleExamCode = async (data) => {
        dispatch(takeStudentExam(data, setNotification, navigate))
    };

    const ExamCodeForm = () => {
        return (
            <form className={styles.form} onSubmit={handleSubmit(handleExamCode)}>
                <div className={styles['form-field']}>
                    <Input>
                        <input type={'text'} placeholder={'Kode Ujian'} {...register('exam_code', { required: true })} />
                    </Input>
                    {errors.exam_code && errors.exam_name.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <Button variant={'primary'} type={'submit'}>
                    {buttonLoading ? (
                        <Spinner variant={'button'} />
                    ) : (
                        'Ambil Ujian'
                    )}
                </Button>
            </form>
        )
    }

    const ExamItem = ({ value }) => {
        const { prodi, name, exam_date, teacher } = value;
        return (
            <div className={styles['exams-item']}>
                <div className={styles['exams-wrapper']}>
                    <Paragraph variant={'body-2'} className={styles['exams-prodi']}>
                        {prodi}
                    </Paragraph>
                    <Title
                        tagElement={'h2'}
                        className={styles['exams-name']}
                        variant={'title-1'}
                        weight={'bold'}
                    >
                        {name}
                    </Title>
                    <div className={styles['exams-teacher']}>
                        {`Created by ${teacher.name}`}
                    </div>
                </div>
                <div className={classNames(styles['exams-wrapper'], styles['exams-wrapper-right'])}>
                    <div className={styles['exams-date']}>
                        {moment(exam_date).format('LLLL')}
                    </div>
                </div>
            </div>
        );
    }

    const mapExam = () => {
        if (studentExamList.length !==0) {
            return (
                <>
                    <div className={styles.exams}>
                        {studentExamList.map((value, index) => {
                            return (
                                <ExamItem value={value} key={index} />
                            );
                        })}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={styles['empty-exam']}>
                        <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>
                            {'Kamu belum mengambil ujian saat ini'}
                        </Paragraph>
                    </div>
                </>
            )
        }
    };

    return (
        <section className={styles.root}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <ExamCodeForm />
            </Modal>
            <Notification
                message={message}
                variant={messageStatus}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.header}>
                <Title
                    tagElement={'h1'}
                    className={styles['header-heading']}
                    variant={'heading-1'}
                    weight={'bold'}
                >
                    {'Daftar ujian yang sudah kamu kerjakan'}
                </Title>
                <div className={styles['header-button']}>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => setIsOpen(true)}
                    >
                        {'Ambil Ujian'}
                    </Button>
                </div>
            </div>
            {loading ? null : mapExam()}
        </section>
    )
};

export default StudentPage;
