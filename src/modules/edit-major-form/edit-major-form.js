import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './edit-major-form.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { updateMajor } from '../../stores/actions/ActionMajor';

const EditMajorForm = ({id, value, setNotification, setIsOpen, setRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector(state => state.ReducerMajor);

  const handleUpdate = async (data) => {
    dispatch(updateMajor(id, data, setNotification, setIsOpen, setRefresh));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Major name'}</Paragraph>
        <Input>
          <input type={'text'} placeholder={value} {...register('name', { required: true })} defaultValue={value} />
        </Input>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>*Required field*</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? (
          <Spinner variant={'button'} />
        ) : (
          'Update Major'
        )}
      </Button>
    </form>
  )
};

export default EditMajorForm;
