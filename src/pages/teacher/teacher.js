import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './teacher.module.scss';

// Components
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Paragraph from '../../components/paragraph/paragraph';

// Modules
import CreateExamForm from '../../modules/create-exam-form/create-exam-form';
import ExamCard from '../../modules/exam-card/exam-card';

// Actions
import { getAllExam } from '../../stores/actions/ActionExam';

const TeacherPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    loading, message,
    messageStatus, examList
  } = useSelector(state => state.ReducerExam);

  useEffect(() => {
    dispatch(getAllExam(setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const mapExam = () => {
    if (examList?.length !==0) {
      return (
        <>
          <div className={styles.exams}>
            {examList.map((value, index) => <ExamCard value={value} key={index} setClipboard={setClipboard} />)}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles['empty-exam']}>
            <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>{'Kamu tidak punya ujian saat ini'}</Paragraph>
          </div>
        </>
      );
    }
  };

  return (
    <section className={styles.root}>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.modal}
      >
        <CreateExamForm
          setIsOpen={setIsOpen}
          setNotification={setNotification}
          setRefresh={setRefresh}
        />
      </Modal>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <Notification
        message={'Copied to clipboard'}
        variant={'success'}
        show={clipboard}
        setShow={setClipboard}
      />
      <div className={styles.header}>
        <Title
          tagElement={'h1'}
          className={styles['header-heading']}
          variant={'heading-1'}
          weight={'bold'}
        >{'Daftar Ujian'}</Title>
        <div className={styles['header-button']}>
          <Button
            type={'button'}
            variant={'primary'}
            onClick={() => setIsOpen(true)}
          >{'Tambah Ujian'}</Button>
        </div>
      </div>
      {loading ? null : mapExam()}
    </section>
  );
};

export default TeacherPage;
