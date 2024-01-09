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
import StudentNavbar from '../../modules/student-navbar/student-navbar';
import StudentEditForm from '../../modules/student-edit-form/student-edit-form';

// Actions
import { getStudentExamResult } from '../../stores/actions/ActionExamResult';
import { getStudent } from '../../stores/actions/ActionStudent';
import { requestChangePasswordStudent } from '../../stores/actions/ActionStudent';

const StudentPage = () => {
  const [notification, setNotification] = useState(false);
  const [examCodeNotification, setExamCodeNotification] = useState(false);
  const [studentNotification, setStudentNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading, message, messageStatus,
    examResultList,
  } = useSelector(state => state.ReducerExamResult);
  const ReducerExam = useSelector(state => state.ReducerExam);
  const ReducerStudent = useSelector(state => state.ReducerStudent);
  const [view, setView] = useState('Exam');

  useEffect(() => {
    dispatch(getStudentExamResult(setNotification, navigate));
    dispatch(getStudent(setStudentNotification, navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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
            {`You haven't take any exam yet`}
          </Paragraph>
        </div>
      );
    };
  };

  const mapProfile = () => {
    let { student } = ReducerStudent;
    const handlePassword = () => {
      dispatch(requestChangePasswordStudent(setStudentNotification, navigate));
    }

    return (
      <div className={styles.profile}>
        <div className={styles['profile-left']}>
          <Title
            tagElement={'h2'}
            className={styles['profile-name']}
            variant={'heading-2'}
            weight={'medium'}
          >{`Name: ${student?.name}`}</Title>
          <Paragraph variant={'title-1'}>{`NIM: ${student?.nim}`}</Paragraph>
          <Paragraph variant={'title-1'}>{`Major: ${student?.prodi}`}</Paragraph>
          <Paragraph variant={'title-1'}>{`Email: ${student?.email}`}</Paragraph>
          <Paragraph variant={'title-1'}>{`Status: ${student?.status}`}</Paragraph>
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
  }

  return (
    <section className={styles.root}>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.modal}
      >
        <ExamCodeForm setNotification={setExamCodeNotification} />
      </Modal>
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className={styles.modal}
      >
        <StudentEditForm
          setIsOpen={setIsEditOpen}
          setNotification={setStudentNotification}
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
        message={ReducerExam.message}
        variant={ReducerExam.messageStatus}
        show={examCodeNotification}
        setShow={setExamCodeNotification}
      />
      <Notification
        message={ReducerStudent.message}
        variant={ReducerStudent.messageStatus}
        show={studentNotification}
        setShow={setStudentNotification}
      />
      <StudentNavbar view={view} setView={setView} />
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
                >{'Take Exam'}</Button>
              </div>
            </div>
            {loading ? <Spinner variant={'page'} /> : mapExamResult()}
          </>
        ) : view === 'Profile' ? (
          <>
            <div className={styles.header}>
              <Title
                  tagElement={'h1'}
                  className={styles['header-heading']}
                  variant={'heading-1'}
                  weight={'bold'}
                >{'Student Profile'}</Title>
            </div>
            {ReducerStudent.loading ? null : mapProfile()}
          </>
        ) : null}
      </div>
    </section>
  )
};

export default StudentPage;
