import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import styles from './create-exam-form.module.scss';

// Components
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Spinner from '../../components/spinner/spinner';

// Actions
import { createExam } from '../../stores/actions/ActionExam';

const CreateExamForm = ({ setIsOpen, setNotification, setRefresh }) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerExam);

  const handleForm = async (data) => dispatch(createExam(data, setIsOpen, setNotification, setRefresh, navigate));

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
      <div className={styles['form-field']}>
        <Input>
          <input type={'text'} placeholder={'Exam Title'} {...register('exam_title', { required: true })} />
        </Input>
        {errors.exam_title && errors.exam_title.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Input>
          <select {...register('prodi', { required: true })}>
            <option value={'Semua Program Studi'}>{'All Major'}</option>
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
          <p className={styles.error}>{'*Required field*'}</p>
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
                placeholderText='Select Exam Start Date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
        </Input>
        {errors.exam_date && errors.exam_date.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
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
                placeholderText='Select Exam End Date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
        </Input>
        {errors.exam_deadline && errors.exam_deadline.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Add Exam'}
      </Button>
    </form>
  );
};

export default CreateExamForm;
