import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styles from './student-exam-result.module.scss';

// Components
import Spinner from '../../components/spinner/spinner';
import Notification from '../../components/notification/notification';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { getExamResultById } from '../../stores/actions/ActionExamResult';

const StudentExamResultPage = () => {
  const { exam_result_id } = useParams();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const {
    loading, message, messageStatus,
    examResult, score, totalScore,
  } = useSelector(state => state.ReducerExamResult);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExamResultById(exam_result_id, setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapAnswer = () => {
    if (examResult?.answers.length !== 0) {
      return examResult.answers.map((value, index) => {
        return (
          <div className={styles.wrapper} key={index}>
            <div className={styles.question} dangerouslySetInnerHTML={{ __html: value.question.name }} />
            <div className={styles.answer}>
              <audio src={value.answer} controls />
              <Paragraph variant={'body-2'}>{`${value.score || 0}/${value.question.max_score}`}</Paragraph>
            </div>
            <div>{'Transcription:'}</div>
            <div>
              {value.transcription || 'Transcription not available'}
            </div>
          </div>
        )
      });
    } else {
      return (
        <Spinner variant={'page'} />
      );
    }
  };

  return (
    <section className={styles.root}>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      {loading ? (<Spinner variant={'page'} />) : (
        <>
          <div className={styles.header}>
            <Title
              tagElement={'h2'}
              className={styles['exams-name']}
              variant={'title-1'}
              weight={'bold'}
            >{examResult?.exam.exam_title}</Title>
            <Paragraph variant={'body-2'}>
              {`Exam Taken Date: ${moment(examResult?.createdAt).format('LLLL')}`}
            </Paragraph>
            <Paragraph variant={'body-2'}>
              {`Teacher: ${examResult?.exam.teacher?.name}`}
            </Paragraph>
            <Paragraph variant={'body-1'}>
              {`Total Score: ${Math.floor(score/totalScore*100)}% or ${score}/${totalScore}`}
            </Paragraph>
          </div>
          <div className={styles.container}>
            {mapAnswer()}
          </div>
        </>
      )}
    </section>
  );
};

export default StudentExamResultPage;
