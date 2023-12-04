import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker'
import classNames from 'classnames';
import moment from 'moment';
import { copyToClipboard } from '../../utils/helper';
import styles from './teacher.module.scss';

// Components
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { createExam, getAllExam } from '../../stores/actions/ActionExam';

const TeacherPage = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    loading, buttonLoading, message,
    messageStatus, examList
  } = useSelector(state => state.ReducerExam);

  useEffect(() => {
    dispatch(getAllExam(setNotification, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const CreateExamForm = () => {
    const handleForm = async (data) => dispatch(createExam(data, setIsOpen, setNotification, setRefresh, navigate));

    return (
      <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
        <div className={styles['form-field']}>
          <Input>
            <input type={'text'} placeholder={'Nama Ujian'} {...register('exam_title', { required: true })} />
          </Input>
          {errors.name && errors.name.type === 'required' && (
            <p className={styles.error}>*Required field*</p>
          )}
        </div>
        <div className={styles['form-field']}>
          <Input>
            <select {...register('prodi', { required: true })}>
              <option value={'Semua Program Studi'}>{'Semua Program Studi'}</option>
              <option value={'Seni Tari'}>{'Seni Tari'}</option>
              <option value={'Seni Musik'}>{'Seni Musik'}</option>
              <option value={'Manajemen'}>{'Manajemen'}</option>
              <option value={'Akuntansi'}>{'Akuntansi'}</option>
              <option value={'Pendidikan Bahasa Mandarin'}>{'Pendidikan Bahasa Mandarin'}</option>
              <option value={'Teknik Perangkat Lunak'}>{'Teknik Perangkat Lunak'}</option>
              <option value={'Teknik Informatika'}>{'Teknik Informatika'}</option>
              <option value={'Sistem Informasi'}>{'Sistem Informasi'}</option>
              <option value={'Teknik Lingkungan'}>{'Teknik Lingkungan'}</option>
              <option value={'Teknik Industri'}>{'Teknik Industri'}</option>
            </select>
          </Input>
          {errors.prodi && errors.prodi.type === 'required' && (
            <p className={styles.error}>*Required field*</p>
          )}
        </div>
        <div className={styles['form-field']}>
          <Input>
            <Controller
              control={control}
              name='exam_date'
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  showTimeInput
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy, h:mm a"
                  placeholderText='Pilih Tanggal Mulai Ujian'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </Input>
          {errors.exam_date && errors.exam_date.type === 'required' && (
            <p className={styles.error}>*Required field*</p>
          )}
        </div>
        <div className={styles['form-field']}>
          <Input>
            <Controller
              control={control}
              name='exam_deadline'
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  showTimeInput
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy, h:mm a"
                  placeholderText='Pilih Tanggal Pengumpulan Ujian'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </Input>
          {errors.exam_deadline && errors.exam_deadline.type === 'required' && (
            <p className={styles.error}>*Required field*</p>
          )}
        </div>
        <Button variant={'primary'} type={'submit'}>
          {buttonLoading ? <Spinner variant={'button'} /> : 'Tambahkan Ujian'}
        </Button>
      </form>
    );
  };

  const ExamItem = ({ value }) => {
    const { prodi, status, name, exam_code, exam_date, exam_deadline, teacher, _id } = value;

    return (
      <div className={styles['exams-item']}>
        <div className={styles['exams-wrapper']}>
          <Paragraph variant={'body-2'} className={styles['exams-prodi']}>{prodi}</Paragraph>
          <Title
            tagElement={'h2'}
            className={styles['exams-name']}
            variant={'title-1'}
            weight={'bold'}
          >{name}</Title>
          <div className={styles['exams-teacher']}>{`Created by ${teacher.name}`}</div>
        </div>
        <div className={classNames(styles['exams-wrapper'], styles['exams-wrapper-right'])}>
          <div className={styles['exams-date']}>
            {`${moment(exam_date).format('LLLL')} - ${moment(exam_deadline).format('LLLL')}`}
          </div>
          <div className={classNames(styles['status-wrapper'], styles[status])}>
            <Paragraph
              variant={'body-2'}
              className={styles['exams-status']}
              color={status === 'Pending' ? 'black' : 'white'}
            >{status}</Paragraph>
          </div>
          <div className={styles['exams-action']}>
            <Button
              variant={'primary'}
              type={'button'}
              className={styles['exams-edit-button']}
              onClick={() => navigate(`/exam-edit/${_id}`)}
            >{'Edit'}</Button>
            <Button
              variant={'secondary'}
              type={'button'}
              className={styles['exams-code']}
              onClick={() => {
                copyToClipboard(exam_code);
                setClipboard(true);
              }}
            >{exam_code}</Button>
          </div>
        </div>
      </div>
    );
  };

  const mapExam = () => {
    if (examList.length !==0) {
      return (
        <>
          <div className={styles.exams}>
            {examList.map((value, index) => <ExamItem value={value} key={index} />)}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles['empty-exam']}>
            <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>{'Kamu tidak punya ujian saat ini'}</Paragraph>
          </div>
        </>
      );
    }
  };

  return (
    <section className={styles.root}>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.modal}
      >
        <CreateExamForm />
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
      <div className={styles.header}>
        <Title
          tagElement={'h1'}
          className={styles['header-heading']}
          variant={'heading-1'}
          weight={'bold'}
        >{'Daftar Ujian'}</Title>
        <div className={styles['header-button']}>
          <Button
              type={'button'}
              variant={'primary'}
              onClick={() => setIsOpen(true)}
          >{'Tambah Ujian'}</Button>
        </div>
      </div>
      {loading ? null : mapExam()}
    </section>
  );
};

export default TeacherPage;
