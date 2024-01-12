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
import TeacherNavbar from '../../modules/teacher-navbar/teacher-navbar';
import TeacherEditForm from '../../modules/teacher-edit-form/teacher-edit-form';

// Actions
import { getAllExam } from '../../stores/actions/ActionExam';
import { getTeacher } from '../../stores/actions/ActionTeacher';
import { requestChangePasswordTeacher } from '../../stores/actions/ActionTeacher';
import { getMajorAll } from '../../stores/actions/ActionMajor';

const TeacherPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const [teacherNotification, setTeacherNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    loading, message,
    messageStatus, examList
  } = useSelector(state => state.ReducerExam);
  const ReducerTeacher = useSelector(state => state.ReducerTeacher);
  const [view, setView] = useState('Exam');

  useEffect(() => {
    dispatch(getAllExam(setNotification, navigate));
    dispatch(getTeacher(setTeacherNotification, navigate));
    dispatch(getMajorAll(setNotification));
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
            <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>{`You don't have any exam yet`}</Paragraph>
          </div>
        </>
      );
    }
  };

  const mapProfile = () => {
    let { teacher } = ReducerTeacher;
    const handlePassword = () => {
      dispatch(requestChangePasswordTeacher(setTeacherNotification, navigate));
    };

    return (
      <div className={styles.profile}>
        <div className={styles['profile-left']}>
          <Title
            tagElement={'h2'}
            className={styles['profile-name']}
            variant={'heading-2'}
            weight={'medium'}
          >{`Name: ${teacher?.name}`}</Title>
          <Paragraph variant={'title-1'}>{`Email: ${teacher?.email}`}</Paragraph>
          <Paragraph variant={'title-1'}>{`Status: ${teacher?.status}`}</Paragraph>
        </div>
        <div className={styles['profile-right']}>
          <Button className={styles.edit} type={'button'} onClick={() => setIsEditOpen(true)}>
            {'Edit'}
          </Button>
          <Button className={styles.password} type={'button'} onClick={() => handlePassword()}>
            {'Change Password'}
          </Button>
        </div>
      </div>
    )
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
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className={styles.modal}
      >
        <TeacherEditForm
          setIsOpen={setIsEditOpen}
          setNotification={setTeacherNotification}
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
      <Notification
        message={ReducerTeacher.message}
        variant={ReducerTeacher.messageStatus}
        show={teacherNotification}
        setShow={setTeacherNotification}
      />
      <TeacherNavbar view={view} setView={setView} />
      <div className={styles.content}>
        {view === 'Exam' ? (
          <>
            <div className={styles.header}>
              <Title
                tagElement={'h1'}
                className={styles['header-heading']}
                variant={'heading-1'}
                weight={'bold'}
              >{'Exam List'}</Title>
              <div className={styles['header-button']}>
                <Button
                  type={'button'}
                  variant={'primary'}
                  onClick={() => setIsOpen(true)}
                >{'Add Exam'}</Button>
              </div>
            </div>
            {loading ? null : mapExam()}
          </>
        ) : view === 'Profile' ? (
          <>
            <div className={styles.header}>
              <Title
                tagElement={'h1'}
                className={styles['header-heading']}
                variant={'heading-1'}
                weight={'bold'}
              >{'Teacher Profile'}</Title>
            </div>
            {ReducerTeacher.loading ? null : mapProfile()}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default TeacherPage;
