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
  const ReducerMajor = useSelector(state => state.ReducerMajor);

  const mapMajorOption = () => {
    if (ReducerMajor.majorList.length !== 0) {
      return (
        <>
          {ReducerMajor.majorList.map((value, index) => {
            return (
              <option key={index} value={value._id}>{value.name}</option>
            )
          })}
        </>
      )
    } else {
      return null;
    }
  };

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
          <select {...register('major', { required: true })} defaultValue={exam?.major}>
            {mapMajorOption()}
          </select>
        </Input>
        {errors.major && errors.major.type === 'required' && (
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
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Update Ujian'}
      </Button>
    </form>
  );
};

export default EditExamForm;
