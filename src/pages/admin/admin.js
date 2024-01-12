import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.scss';

// Components
import Notification from '../../components/notification/notification';
import Title from '../../components/title/title';
import Spinner from '../../components/spinner/spinner';
import Modal from '../../components/modal/modal';

// Modules
import AdminNavbar from '../../modules/admin-navbar/admin-navbar';
import TeacherCard from '../../modules/teacher-card/teacher-card';
import StudentCard from '../../modules/student-card/student-card';
import MajorCard from '../../modules/major-card/major-card';
import CreateTeacherForm from '../../modules/create-teacher-form/create-teacher-form';
import CreateStudentForm from '../../modules/create-student-form/create-student-form';
import CreateMajorForm from '../../modules/create-major-form/create-major-form';

// Actions
import { getTeacherAll } from '../../stores/actions/ActionTeacher';
import { getStudentAll } from '../../stores/actions/ActionStudent';

// Icons
import { ReactComponent as PlusIcon } from '../../assets/icons/fi_plus.svg';
import { getMajorAll } from '../../stores/actions/ActionMajor';

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ReducerTeacher = useSelector(state => state.ReducerTeacher);
  const ReducerStudent = useSelector(state => state.ReducerStudent);
  const ReducerMajor = useSelector(state => state.ReducerMajor);
  const [view, setView] = useState('Teacher');
  const [teacherIsOpen, setTeacherIsOpen] = useState(false);
  const [studentIsOpen, setStudentIsOpen] = useState(false);
  const [majorIsOpen, setMajorIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [studentNotification, setStudentNotification] = useState(false);
  const [majorNotification, setMajorNotification] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (view === 'Teacher') {
      dispatch(getTeacherAll(setNotification, navigate));
    }
    if (view === 'Student') {
      dispatch(getStudentAll(setStudentNotification, navigate));
      dispatch(getMajorAll(setMajorNotification));
    }
    if (view === 'Major') {
      dispatch(getMajorAll(setMajorNotification));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, refresh]);

  const mapTeacher = () => {
    if (ReducerTeacher.teacherList.length !== 0) {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setTeacherIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Teacher'}</p>
          </div>
          {ReducerTeacher.teacherList.map((value, index) => {
            return (
              <TeacherCard key={index} value={value} notification={setNotification} refresh={setRefresh} />
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setTeacherIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Teacher'}</p>
          </div>
          <div>{'There is no teacher'}</div>
        </>
      )
    }
  };

  const mapStudent = () => {
    if (ReducerStudent.studentList.length !== 0) {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setStudentIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Student'}</p>
          </div>
          {ReducerStudent.studentList.map((value, index) => {
            return (
              <StudentCard key={index} value={value}  notification={setStudentNotification} refresh={setRefresh} />
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setStudentIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Student'}</p>
          </div>
          <div>{'There is no student'}</div>
        </>
      )
    }
  }

  const mapMajor = () => {
    if (ReducerMajor.majorList.length !== 0) {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setMajorIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Major'}</p>
          </div>
          {ReducerMajor.majorList.map((value, index) => {
            return (
              <MajorCard key={index} value={value} notification={setMajorNotification} refresh={setRefresh} />
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setMajorIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Add Major'}</p>
          </div>
          <div>{'There is no major'}</div>
        </>
      )
    }
  };

  return (
    <section className={styles.root}>
      <Notification
        message={ReducerTeacher.message}
        variant={ReducerTeacher.messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <Notification
        message={ReducerStudent.message}
        variant={ReducerStudent.messageStatus}
        show={studentNotification}
        setShow={setStudentNotification}
      />
      <Notification
        message={ReducerMajor.message}
        variant={ReducerMajor.messageStatus}
        show={majorNotification}
        setShow={setMajorNotification}
      />
      <AdminNavbar view={view} setView={setView} />
      <Modal
        open={teacherIsOpen}
        onClose={() => setTeacherIsOpen(false)}
        className={styles.modal}
      >
        <CreateTeacherForm
          setIsOpen={setTeacherIsOpen}
          setNotification={setNotification}
          setRefresh={setRefresh}
         />
      </Modal>
      <Modal
        open={studentIsOpen}
        onClose={() => setStudentIsOpen(false)}
        className={styles.modal}
      >
        <CreateStudentForm
          setIsOpen={setStudentIsOpen}
          setNotification={setNotification}
          setRefresh={setRefresh}
         />
      </Modal>
      <Modal
        open={majorIsOpen}
        onClose={() => setMajorIsOpen(false)}
        className={styles.modal}
      >
        <CreateMajorForm
          setIsOpen={setMajorIsOpen}
          setNotification={setMajorNotification}
          setRefresh={setRefresh}
         />
      </Modal>
      <div className={styles.content}>
        {view === 'Teacher' ? (
          <>
            <Title className={styles.header} tagElement={'h1'} variant={'heading-1'} weight={'medium'} color={'white'}>{'Teacher List'}</Title>
            <div className={styles.list}>
              {ReducerTeacher.loading ? <Spinner variant={'page'} /> : mapTeacher()}
            </div>
          </>
        ) : view === 'Student' ? (
          <>
            <Title className={styles.header} tagElement={'h1'} variant={'heading-1'} weight={'medium'} color={'white'}>{'Student List'}</Title>
            <div className={styles.list}>
              {ReducerStudent.loading ? <Spinner variant={'page'} /> : mapStudent()}
            </div>
          </>
        ) : view === 'Major' ? (
          <>
            <Title className={styles.header} tagElement={'h1'} variant={'heading-1'} weight={'medium'} color={'white'}>{'Major List'}</Title>
            <div className={styles.list}>
              {ReducerMajor.loading ? <Spinner variant={'page'} /> : mapMajor()}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default AdminPage;
