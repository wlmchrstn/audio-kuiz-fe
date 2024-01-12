import React from 'react';
import styles from './create-major-form.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { createMajor } from '../../stores/actions/ActionMajor';

const CreateMajorForm = ({ setNotification, setIsOpen, setRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerMajor);

  const handleCreate = async (data) => {
    dispatch(createMajor(data, setNotification, setIsOpen, setRefresh));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Major name'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={'Major name'} {...register('name', { required: true })} />
        </Input>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>*Required field*</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? (
          <Spinner variant={'button'} />
        ) : (
          'Add Major'
        )}
      </Button>
    </form>
  )
};

export default CreateMajorForm;
