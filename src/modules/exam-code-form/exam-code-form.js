import React from 'react';
import styles from './exam-code-form.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

// Actions
import { takeStudentExam } from '../../stores/actions/ActionExam';


const ExamCodeForm = ({ setNotification }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerStudent);
  const navigate = useNavigate();

  const handleExamCode = async (data) => {
    dispatch(takeStudentExam(data, setNotification, navigate));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleExamCode)}>
      <div className={styles['form-field']}>
        <Input>
          <input type={'text'} placeholder={'Kode Ujian'} {...register('exam_code', { required: true })} />
        </Input>
        {errors.exam_code && errors.exam_name.type === 'required' && (
          <p className={styles.error}>*Required field*</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? (
          <Spinner variant={'button'} />
        ) : (
          'Ambil Ujian'
        )}
      </Button>
    </form>
  );
};

export default ExamCodeForm;