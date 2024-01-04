import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import styles from './exam-result.module.scss';

// Components
import Spinner from '../../components/spinner/spinner';
import Notification from '../../components/notification/notification';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Input from '../../components/input/input';

// Actions
import { getExamResultById } from '../../stores/actions/ActionExamResult';
import { updateAnswerScore } from '../../stores/actions/ActionAnswer';

const ExamResultPage = () => {
  const { exam_result_id } = useParams();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();
  const { loading, message, messageStatus, examResult } = useSelector(state => state.ReducerExamResult);
  const ReducerAnswer = useSelector(state => state.ReducerAnswer);
  const [refresh, setRefresh] = useState(false);
  const [isNilaiOpen, setIsNilaiOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(getExamResultById(exam_result_id, setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const handleOpenNilai = (id) => {
    setIndex(id);
    setIsNilaiOpen(true);
  };

  const handleNilai = async (data) => {
    return dispatch(updateAnswerScore(index, data, setIsNilaiOpen, setNotification, setRefresh, navigate));
  };

  const mapAnswer = () => {
    if (examResult?.answers.length !== 0) {
      return examResult.answers.map((value, index) => {
        return (
          <div className={styles.wrapper} key={index}>
            <div className={styles.question} dangerouslySetInnerHTML={{ __html: value.question.name }} />
            <div className={styles.answer}>
              <audio src={value.answer} controls />
              <div>
                <Paragraph variant={'body-2'}>{`Nilai: ${value.score || 0}/${value.question.max_score}`}</Paragraph>
                <Button className={styles.nilai} type={'button'} onClick={() => handleOpenNilai(value._id)}>{'Beri nilai'}</Button>
              </div>
            </div>
            <div>{'Transcription:'}</div>
            <div>
              {value.transcription || 'Transcription'}
            </div>
          </div>
        )
      });
    } else {
      return (
        <Spinner variant={'page'} />
      );
    }
  }

  const mapResult = () => {
    return (
      <>
        <div className={styles.header}>
          <Title
            tagElement={'h2'}
            className={styles['exams-name']}
            variant={'title-1'}
            weight={'bold'}
          >{examResult?.exam.exam_title}</Title>
          <Paragraph variant={'body-2'}>
            {`Tanggal Ujian: ${moment(examResult?.exam.exam_date).format('LLLL')}`}
          </Paragraph>
          <Paragraph variant={'body-2'}>
            {`Nama mahasiswa: ${examResult?.student?.name}`}
          </Paragraph>
        </div>
        <div className={styles.wrapper}>
          {mapAnswer()}
        </div>
      </>
    );
  };

  return (
    <section className={styles.root}>
      <Notification
        message={message}
        variant={messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <Modal
        open={isNilaiOpen}
        onClose={() => setIsNilaiOpen(false)}
        className={styles.modal}
      >
        <form className={styles.form} onSubmit={handleSubmit(handleNilai)}>
          <div className={styles['form-field']}>
            <Paragraph variant={'body-2'}>{'Nilai'}</Paragraph>
            <Input>
              <input type={'number'} placeholder={'Nilai'} {...register('score', { required: true })} />
            </Input>
            {errors.score && errors.score.type === 'required' && (
              <p className={styles.error}>*Required field*</p>
            )}
          </div>
          <Button variant={'primary'} type={'submit'}>
            {ReducerAnswer.buttonLoading ? (
              <Spinner variant={'button'} />
            ) : (
              'Simpan'
            )}
          </Button>
        </form>
      </Modal>
      {loading ? <Spinner variant={'page'} /> : mapResult()}
    </section>
  )
};

export default ExamResultPage;
