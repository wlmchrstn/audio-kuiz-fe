import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './student-exam.module.scss';

// Components
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';

// Actions
import { createExamResult } from '../../stores/actions/ActionExamResult';
import { getExamByExamCode } from '../../stores/actions/ActionExam';
import { createAnswer } from '../../stores/actions/ActionAnswer';

const StudentExamPage = () => {
  const [step, setStep] = useState('initial');
  const [examStep, setExamStep] = useState('question');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [timer, setTimer] = useState(0);
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: false });
  const [recordStatus, setRecordStatus] = useState("");
  const { buttonLoading } = useSelector(
      state => state.ReducerStudent
  );
  const { exam, examQuestionList } = useSelector(
    state => state.ReducerExam
  );
  const { examResult } = useSelector(state => state.ReducerExamResult);
  const { exam_code } = useParams();

  useLayoutEffect(() => {
    if (exam.exam_title === '') {
      dispatch(getExamByExamCode(exam_code, setNotification, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam_code]);

  const handleStartExam = () => {
    dispatch(createExamResult(exam.id, setStep, setExamStep, setQuestionNumber, setNotification, navigate));
  };

  useEffect(() => {
    if (timer > 0 && step === 'start' && (examStep === 'question' || examStep === 'answer')) {
      const interval = setInterval(() => {
        setTimer(timer-1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && step === 'start' && examStep === 'question') {
      startRecording();
      setRecordStatus(status);
      setExamStep('answer');
    } else if (timer === 0 && step === 'start' && examStep === 'answer') {
      stopRecording();
      setRecordStatus(status);
      const interval = setInterval(() => {
        if (questionNumber === examQuestionList.length-1) {
          setExamStep('final');
        } else {
          setExamStep('next-question');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  useEffect(() => {
    if (step === 'start' && examStep === 'question') {
      setTimer(examQuestionList[questionNumber]?.question_time);
    } else if (step === 'start' && examStep === 'answer') {
      setTimer(examQuestionList[questionNumber]?.answer_time);
    } else if (step === 'start' && examStep === 'next-question') {
      dispatch(createAnswer(examQuestionList[questionNumber]._id, examResult.id, mediaBlobUrl, setStep, examStep, setExamStep, setQuestionNumber, notification, navigate));
    } else if (step === 'start' && examStep === 'final') {
      dispatch(createAnswer(examQuestionList[questionNumber]._id, examResult.id, mediaBlobUrl, setStep, examStep, setExamStep, setQuestionNumber, notification, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, examStep]);

  const mapUjian = () => {
    return (
      <div>
        <div className={styles['question-wrapper']}>
          <div className={styles['question-name']} dangerouslySetInnerHTML={{ __html: examQuestionList[questionNumber].name }}></div>
        </div>
        <Paragraph variant={'body-1'}>`{`Timer: ${timer}`}</Paragraph>
        <Paragraph variant={'body-1'}>{`Rekaman akan dimulai dalam: ${examQuestionList[questionNumber].question_time}`}</Paragraph>
        <Paragraph variant={'body-1'}>{`Waktu menjawab akan selesai dalam: ${examQuestionList[questionNumber].answer_time}`}</Paragraph>
        <Paragraph variant={'body-1'}>{recordStatus}</Paragraph>
        <Paragraph variant={'body-1'}>{mediaBlobUrl}</Paragraph>
      </div>
    );
  };

  const mapFinishUjian = () => {
    return (
      <div>
        <Title tagElement={'h1'} variant={'heading-1'}>
          {'Ujian telah selesai, jawabanmu sedang disimpan'}
        </Title>
        <Button variant={'primary'} type={'button'} onClick={() => navigate('/student')}>
          {buttonLoading ? (
            <Spinner variant={'button'} />
          ) : (
            'Kembali ke halaman murid'
          )}
        </Button>
      </div>
    );
  };

  return (
    <section className={styles.root}>
      {step === 'initial' ? (
        <div className={styles['exam-info']}>
          <Title variant={'heading-1'}>{exam?.exam_title}</Title>
          <Paragraph variant={'body-1'}>{`Program studi: ${exam?.prodi}`}</Paragraph>
          <Paragraph variant={'body-1'}>{`Tanggal Ujian: ${moment(exam?.exam_date).format('LLLL')}`}</Paragraph>
          <Paragraph variant={'body-1'}>{`Kode Ujian: ${exam?.exam_code}`}</Paragraph>
          <Paragraph variant={'body-1'}>{`Dosen Pengampu: ${exam?.teacher.name}`}</Paragraph>
          <div className={styles['button-wrapper']}>
            <Button variant={'primary'} type={'button'} onClick={() => handleStartExam()}>{'Mulai Ujian'}</Button>
          </div>
        </div>
      ) : step === 'start' ? (
        mapUjian()
      ) : mapFinishUjian()}
    </section>
  )
};

export default StudentExamPage;
