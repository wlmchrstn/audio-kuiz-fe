import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styles from './edit-exam-form.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

// Actions
import { updateExam } from '../../stores/actions/ActionExam';

const EditExamForm = ({ id, setIsEditOpen, setNotification }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buttonLoading, exam } = useSelector(state => state.ReducerExam);
  const handleEditExamForm = async (data) => dispatch(updateExam(id, data, setIsEditOpen, setNotification, navigate));

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleEditExamForm)}>
      <div className={styles['form-field']}>
        <Input>
          <input type={'text'} placeholder={'Nama Ujian'} {...register('exam_title', { required: true })} defaultValue={exam?.exam_title} />
        </Input>
        {errors.exam_title && errors.exam_title.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Input>
          <select {...register('prodi', { required: true })} defaultValue={exam?.prodi}>
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
                placeholderText={'exam.exam_date'}
                onChange={(date) => field.onChange(date)}
                selected={field.value ? field.value : Date.parse(exam?.exam_date)}
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
                placeholderText={'exam.exam_deadline'}
                onChange={(date) => field.onChange(date)}
                selected={field.value ? field.value : Date.parse(exam?.exam_deadline)}
              />
            )}
          />
        </Input>
        {errors.exam_deadline && errors.exam_deadline.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Input>
          <select {...register('exam_type', { required: true })}>
            <option value={'Automatic'}>{'Automatic'}</option>
            <option value={'Manual'}>{'Manual'}</option>
          </select>
        </Input>
        {errors.exam_type && errors.exam_type.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Update Ujian'}
      </Button>
    </form>
  );
};

export default EditExamForm;
