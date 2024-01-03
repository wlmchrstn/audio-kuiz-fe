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
import CreateTeacherForm from '../../modules/create-teacher-form/create-teacher-form';
import CreateStudentForm from '../../modules/create-student-form/create-student-form';

// Actions
import { getTeacherAll } from '../../stores/actions/ActionTeacher';
import { getStudentAll } from '../../stores/actions/ActionStudent';
import { getAdmin } from '../../stores/actions/ActionAdmin';

// Icons
import { ReactComponent as PlusIcon } from '../../assets/icons/fi_plus.svg';

const AdminPage = () => {
  const [view, setView] = useState('Teacher');
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ReducerTeacher = useSelector(state => state.ReducerTeacher);
  const ReducerStudent = useSelector(state => state.ReducerStudent);
  const [teacherIsOpen, setTeacherIsOpen] = useState(false);
  const [studentIsOpen, setStudentIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (view === 'Teacher') {
      dispatch(getTeacherAll(notification, navigate));
    }
    if (view === 'Student') {
      dispatch(getStudentAll(notification, navigate));
    }
    if (view === 'Profile') {
      dispatch(getAdmin(notification, navigate));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, refresh]);

  const mapTeacher = () => {
    if (ReducerTeacher.teacherList.length !== 0) {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setTeacherIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Tambah dosen'}</p>
          </div>
          {ReducerTeacher.teacherList.map((value, index) => {
            return (
              <TeacherCard key={index} value={value} notification={setNotification} refresh={setRefresh} />
            );
          })}
        </>
      );
    } else {
      return <div>{'Belum ada dosen'}</div>
    }
  };

  const mapStudent = () => {
    if (ReducerStudent.studentList.length !== 0) {
      return (
        <>
          <div className={styles['button-add']} onClick={() => setStudentIsOpen(true)}>
            <PlusIcon stroke='#fff'/>
            <p>{'Tambah mahasiswa'}</p>
          </div>
          {ReducerStudent.studentList.map((value, index) => {
            return (
              <StudentCard key={index} value={value}  notification={setNotification} refresh={setRefresh} />
            );
          })}
        </>
      );
    } else {
      return <div>{'Belum ada mahasiswa'}</div>
    }
  }

  return (
    <section className={styles.root}>
      <Notification
        message={ReducerTeacher.message}
        variant={ReducerTeacher.messageStatus}
        show={notification}
        setShow={setNotification}
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
      <div className={styles.content}>
        {view === 'Teacher' ? (
          <>
            <Title className={styles.header} tagElement={'h1'} variant={'heading-1'} weight={'medium'} color={'white'}>{'Daftar dosen'}</Title>
            <div className={styles.list}>
              {ReducerTeacher.loading ? <Spinner variant={'page'} /> : mapTeacher()}
            </div>
          </>
        ) : view === 'Student' ? (
          <>
            <Title className={styles.header} tagElement={'h1'} variant={'heading-1'} weight={'medium'} color={'white'}>{'Daftar mahasiswa'}</Title>
            <div className={styles.list}>
              {ReducerStudent.loading ? <Spinner variant={'page'} /> : mapStudent()}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default AdminPage;
