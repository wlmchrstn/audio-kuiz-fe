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
import CustomWebcam from '../../components/webcam/webcam';

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
  const [, setRecordStatus] = useState("");
  const { buttonLoading } = useSelector(
    state => state.ReducerStudent
  );
  const { exam, examQuestionList } = useSelector(
    state => state.ReducerExam
  );
  const { examResult } = useSelector(state => state.ReducerExamResult);
  const { exam_code } = useParams();
  const [webcam, setWebcam] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
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
        <div className={styles.timer}>
          <Title tagElement={'h1'} variant={'heading-1'}>
            {`Question Number ${questionNumber+1}`}
          </Title>
          <Title variant={'heading-1'}>{`Timer: ${timer}`}</Title>
        </div>
        <div className={styles['question-wrapper']}>
          <div className={styles['question-name']} dangerouslySetInnerHTML={{ __html: examQuestionList[questionNumber].name }}></div>
        </div>
        {examStep === 'question' ? (
          <>
            <Paragraph variant={'heading-1'}>{`You have ${examQuestionList[questionNumber].question_time} second to prepare`}</Paragraph>
            <Paragraph variant={'heading-1'}>{`You have ${examQuestionList[questionNumber].answer_time} to answer the question`}</Paragraph>
          </>
        ) : (
          <Paragraph variant={'heading-1'}>{'Recording started, now is your time to answer!'}</Paragraph>
        )}
        <CustomWebcam className={styles.webcam} width={320} height={180} audio={false} timer={timer} examResultId={examResult.id}/>
      </div>
    );
  };

  const mapFinishUjian = () => {
    return (
      <div>
        <Title tagElement={'h1'} variant={'heading-1'}>
          {'Exam finished, Your answer will be saved'}
        </Title>
        <Button variant={'primary'} type={'button'} onClick={() => navigate('/student')}>
          {buttonLoading ? (
            <Spinner variant={'button'} />
          ) : (
            'Back to dashboard'
          )}
        </Button>
      </div>
    );
  };

  navigator.permissions.query({ name: 'camera' })
  .then(function(permissionStatus){
    if (permissionStatus.state === 'granted') {
      setCameraPermission(true);
    }
    permissionStatus.onchange = function() {
      if (this.state === 'granted') {
        setCameraPermission(true);
      }
    }
  });

  navigator.permissions.query({ name: 'microphone' })
  .then(function(permissionStatus) {
    if (permissionStatus.state === 'granted') {
      setMicPermission(true);
    }

    permissionStatus.onchange = function() {
      if (this.state === 'granted') {
        setMicPermission(true);
      }
    }
  });

  const testCamMic = () => {
    setWebcam(true);
  };

  return (
    <section className={styles.root}>
      {step === 'initial' ? (
        <>
          <div className={styles['exam-info']}>
            <Title variant={'heading-1'}>{exam?.exam_title}</Title>
            <Paragraph variant={'body-1'}>{`Major: ${exam?.major?.name}`}</Paragraph>
            <Paragraph variant={'body-1'}>{`Exam Date: ${moment(exam?.exam_date).format('LLLL')}`}</Paragraph>
            <Paragraph variant={'body-1'}>{`Exam Deadline: ${moment(exam?.exam_deadline).format('LLLL')}`}</Paragraph>
            <Paragraph variant={'body-1'}>{`Exam Code: ${exam?.exam_code}`}</Paragraph>
            <Paragraph variant={'body-1'}>{`Teacher: ${exam?.teacher.name}`}</Paragraph>
            <div style={{ textAlign: 'center' }}>
              <Title tagElement={'h1'} variant={'heading-2'} weight={'medium'}>{'Read before taking exam'}</Title>
            </div>
            <Paragraph variant={'body-1'}>{`1. Please make sure you are in a quiet place before taking the exam to prevent mistranscription of your answer`}</Paragraph>
            <Paragraph variant={'body-1'}>{`2. You will need to open cam and microphone to take this exam`}</Paragraph>
            <Paragraph variant={'body-1'}>{`3. Each question will be give automatically, you will have a set preparation time to read the question`}</Paragraph>
            <Paragraph variant={'body-1'}>{`4. After the preparation time out, The recording will start automatically and record your answer based on the given time`}</Paragraph>
            <Paragraph variant={'body-1'}>{`5. After the answer period finish, you will be automatically move to the next question and will repeat the process above`}</Paragraph>
            <Paragraph variant={'body-1'}>{`6. After all question has been through, a finish screen will be displayed and you can go back to your dashboard`}</Paragraph>
            <div className={styles['button-wrapper']}>
              <Button variant={'primary'} type={'button'} onClick={() => testCamMic()}>{'Test Camera And Mic'}</Button>
              <Button variant={'primary'} type={'button'} onClick={() => handleStartExam()} disabled={cameraPermission === true && micPermission === true ? false : true}>{'Start Exam'}</Button>
            </div>
          </div>
          {webcam ? (
            <div className={styles['webcam-container']} style={{ marginTop: '24px'}}>
              <CustomWebcam width={720} height={405} audio={true} />
            </div>
          ) : null}
        </>
      ) : step === 'start' ? (
        mapUjian()
      ) : mapFinishUjian()}
    </section>
  )
};

export default StudentExamPage;
