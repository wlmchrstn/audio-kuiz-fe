import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { copyToClipboard } from '../../utils/helper';
import styles from './exam-edit.module.scss';

// Components
import Title from '../../components/title/title';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

// Modules
import EditExamForm from '../../modules/edit-exam-form/edit-exam-form';
import QuestionCard from '../../modules/question-card/question-card';
import CreateQuestionForm from '../../modules/create-question-form/create-question-form';
import EditQuestionForm from '../../modules/edit-question-form/edit-question-form';

// Icons
import iconPlus from '../../assets/icons/fi_plus.svg';

// Actions
import { getExamEdit, publishExam, unpublishExam, deleteExam } from '../../stores/actions/ActionExam';
import { getQuestionForEdit } from '../../stores/actions/ActionQuestion';
import { getExamResultByExamId } from '../../stores/actions/ActionExamResult';

const ExamEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [questionNotification, setQuestionNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    loading, buttonLoading, deleteButtonLoading,
    message, messageStatus, exam, examQuestionList
  } = useSelector(state => state.ReducerExam);
  const questionMessage = useSelector(state => state.ReducerQuestion.message);
  const questionMessageStatus = useSelector(state => state.ReducerQuestion.messageStatus);
  const { examResultList } = useSelector(state => state.ReducerExamResult);
  const [view, setView] = useState('pertanyaan');

  useEffect(() => {
    dispatch(getExamEdit(id, setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handlePublish = async () => {
    dispatch(publishExam(id, setNotification, navigate));
  };

  const handleUnpublish = async () => {
    dispatch(unpublishExam(id, setNotification, navigate));
  };

  const handleDelete = async () => {
    dispatch(deleteExam(id, setNotification, navigate));
  };

  const handleEditQuestion = (id) => {
    dispatch(getQuestionForEdit(id, setIsEditQuestionOpen, navigate));
  };

  useEffect(() => {
    dispatch(getExamResultByExamId(id, setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapQuestion = () => {
    return (
      <>
        <div className={styles['button-add']} onClick={() => setIsOpen(true)}>
          <img src={iconPlus} alt={'fi_plus'} />
          <Paragraph variant={'body-2'} color={'neutral'}>{'Tambah Pertanyaan'}</Paragraph>
        </div>
        {examQuestionList.length !== 0 ? (
          <div className={styles.exams}>
            {examQuestionList.map((value, index) => {
              return <QuestionCard value={value} key={index} onClick={() => handleEditQuestion(value._id)} />;
            })}
          </div>
        ) : (
          <div className={styles['empty-question']}>
            <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>{'Belum ada pertanyaan'}</Paragraph>
          </div>
        )}
      </>
    );
  };

  const mapAnswer = () => {
    if (examResultList?.length !== 0) {
      return examResultList.map((value, index) => {
        return (
          <div className={styles.result} key={index}>
            <div className={styles['result-left']}>
              <Title variant={'title'}>{value.student.name}</Title>
            </div>
            <div className={styles['result-right']}>
              <Button type={'button'} onClick={() => navigate(`/exam-result/${value._id}`)}>{'Lihat hasil ujian'}</Button>
            </div>
          </div>
        )
      })
    } else {
      return (
        <Spinner variant={'page'} />
      );
    }
  };

  return (
    <section className={styles.root}>
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className={styles['modal-exam-edit']}
      >
        <EditExamForm
          id={id}
          setIsEditOpen={setIsEditOpen}
          setNotification={setNotification}
        />
      </Modal>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles['modal-question']}
      >
        <CreateQuestionForm
          id={id}
          setIsOpen={setIsOpen}
          setNotification={setQuestionNotification}
          setRefresh={setRefresh}
        />
      </Modal>
      <Modal
        open={isEditQuestionOpen}
        onClose={() => setIsEditQuestionOpen(false)}
        className={styles['modal-question']}
      >
        <EditQuestionForm
          setIsOpen={setIsEditQuestionOpen}
          setNotification={setNotification}
        />
      </Modal>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <Notification
        message={questionMessage}
        variant={questionMessageStatus}
        show={questionNotification}
        setShow={setQuestionNotification}
      />
      <div className={styles.exam}>
        {loading ? (
          <Spinner variant={'page'} />
        ) : (
          <>
            <div className={styles['exam-left']}>
              <Title tagElement={'h1'} variant={'heading-1'}>
                {exam?.exam_title}
              </Title>
              <Title tagElement={'h2'} variant={'title-1'}>
                {`Program Studi: ${exam?.prodi}`}
              </Title>
              <Paragraph variant={'body-1'}>
                {`Tanggal Ujian: ${moment(exam?.exam_date).format('LLLL')}`}
              </Paragraph>
              <Paragraph variant={'body-1'}>
                {`Dosen Pengampu: ${exam?.teacher.name}`}
              </Paragraph>
            </div>
            <div className={styles['exam-right']}>
              <div className={classNames(styles.status, styles[exam?.status])}>
                <Paragraph variant={'body-1'}>
                  {exam?.status}
                </Paragraph>
              </div>
              <div className={styles['button-group']}>
                {exam?.status === 'Published' ? (
                  <Button variant={'primary'} type={'button'} className={styles.publish} onClick={() => handleUnpublish()}>
                    {buttonLoading ? <Spinner variant={'button'} /> : 'Unpublish Ujian'}
                  </Button>
                ) : (
                  <Button variant={'primary'} type={'button'} className={styles.publish} onClick={() => handlePublish()}>
                    {buttonLoading ? <Spinner variant={'button'} /> : 'Publish Ujian'}
                  </Button>
                )}
                <Button variant={'secondary'} type={'button'} className={styles['exam-code']} onClick={() => copyToClipboard(exam.exam_code)}>
                  {exam?.exam_code}
                </Button>
                <Button variant={'primary'} type={'button'} onClick={() => setIsEditOpen(true)}>
                  {'Edit'}
                </Button>
                <Button variant={'danger'} type={'button'} onClick={() => handleDelete()}>
                  {deleteButtonLoading ? <Spinner variant={'button'} /> : 'Delete'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.questions}>
        {loading ? (
          <Spinner variant={'page'} />
        ) : (
          <>
            <div className={styles.navigation}>
              <Button type={'button'} onClick={() => setView('pertanyaan')}>
                {'Daftar pertanyaan'}
              </Button>
              <Button type={'button'} onClick={() => setView('hasil')}>
                {'Hasil Ujian'}
              </Button>
            </div>
            {view === 'pertanyaan' ? mapQuestion() : mapAnswer()}
          </>
        )}
      </div>
    </section>
  );
};

export default ExamEditPage;
