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
          <select {...register('major', { required: true })}>
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
      <div className={styles['form-field']}>
        <Input>
          <select {...register('exam_language', { required: true })} defaultValue={exam?.exam_language}>
            <option value={'en-US'}>{'English'}</option>
            <option value={'id-ID'}>{'Indonesia'}</option>
          </select>
        </Input>
        {errors.exam_language && errors.exam_language.type === 'required' && (
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
