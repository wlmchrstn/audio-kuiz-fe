import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './student.module.scss';

// Components
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

// Modules
import ExamResultCard from '../../modules/exam-result-card/exam-result-card';
import ExamCodeForm from '../../modules/exam-code-form/exam-code-form';

// Actions
import { getStudentExamResult } from '../../stores/actions/ActionExamResult';

const StudentPage = () => {
  const [notification, setNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading, message, messageStatus,
    examResultList,
  } = useSelector(state => state.ReducerExamResult);

  useEffect(() => {
    dispatch(getStudentExamResult(setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapExamResult = () => {
    if (examResultList?.length !==0) {
      return (
        <div className={styles.exams}>
          {examResultList.map((value, index) => {
            return <ExamResultCard value={value} key={index} />;
          })}
        </div>
      );
    } else {
      return (
        <div className={styles['empty-exam']}>
          <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>
            {'Kamu belum ada mengambil ujian saat ini'}
          </Paragraph>
        </div>
      );
    };
  };

  return (
    <section className={styles.root}>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.modal}
      >
        <ExamCodeForm setNotification={setNotification} />
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
        >{'Daftar ujian yang sudah kamu kerjakan'}</Title>
        <div className={styles['header-button']}>
          <Button
            type={'button'}
            variant={'primary'}
            onClick={() => setIsOpen(true)}
          >{'Ambil Ujian'}</Button>
        </div>
      </div>
      {loading ? <Spinner variant={'page'} /> : mapExamResult()}
    </section>
  )
};

export default StudentPage;
