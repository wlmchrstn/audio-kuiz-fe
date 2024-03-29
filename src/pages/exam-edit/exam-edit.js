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
import { ReactComponent as PlusIcon } from '../../assets/icons/fi_plus.svg';

// Actions
import { getExamEdit, publishExam, unpublishExam, deleteExam } from '../../stores/actions/ActionExam';
import { getQuestionForEdit } from '../../stores/actions/ActionQuestion';
import { getExamResultByExamId } from '../../stores/actions/ActionExamResult';
import { getMajorAll } from '../../stores/actions/ActionMajor';

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

  useEffect(() => {
    dispatch(getExamResultByExamId(id, setNotification, navigate));
    dispatch(getMajorAll(setNotification));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePublish = async () => {
    dispatch(publishExam(id, setNotification, navigate));
  };

  const handleUnpublish = async () => {
    dispatch(unpublishExam(id, setNotification, navigate));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this exam?") === true) {
      return dispatch(deleteExam(id, setNotification, navigate));
    } else {
      return null;
    }
  };

  const handleEditQuestion = (id) => {
    dispatch(getQuestionForEdit(id, setIsEditQuestionOpen, navigate));
  };

  const mapQuestion = () => {
    return (
      <>
        <div className={styles['button-add']} onClick={() => setIsOpen(true)}>
          <PlusIcon stroke={'#486581'} />
          <Paragraph variant={'body-2'} color={'neutral-4'}>{'Add Question'}</Paragraph>
        </div>
        {examQuestionList?.length !== 0 ? (
          <div className={styles.exams}>
            {examQuestionList.map((value, index) => {
              return <QuestionCard value={value} key={index} onClick={() => handleEditQuestion(value._id)} notification={setQuestionNotification} refresh={setRefresh} />;
            })}
          </div>
        ) : (
          <div className={styles['empty-question']}>
            <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>{'There is no question'}</Paragraph>
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
              <Title variant={'title'}>{value.student.nim}</Title>
              <Title variant={'title'}>{value.student.major?.name}</Title>
            </div>
            <div className={styles['result-right']}>
              <Button type={'button'} onClick={() => navigate(`/exam-result/${value._id}`)}>{'See exam result'}</Button>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div>{'There is no result'}</div>
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
                {`Major: ${exam?.major?.name}`}
              </Title>
              <Paragraph variant={'body-1'}>
                {`Exam Date: ${moment(exam?.exam_date).format('LLLL')}`}
              </Paragraph>
              <Paragraph variant={'body-1'}>
                {`Teacher: ${exam?.teacher.name}`}
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
                    {buttonLoading ? <Spinner variant={'button'} /> : 'Unpublish Exam'}
                  </Button>
                ) : (
                  <Button variant={'primary'} type={'button'} className={styles.publish} onClick={() => handlePublish()}>
                    {buttonLoading ? <Spinner variant={'button'} /> : 'Publish Exam'}
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
                {'Question List'}
              </Button>
              <Button type={'button'} onClick={() => setView('hasil')}>
                {'Exam Result'}
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
