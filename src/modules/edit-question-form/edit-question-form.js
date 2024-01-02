import React, { useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import styles from './edit-question-form.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

// Actions
import { updateQuestion } from '../../stores/actions/ActionQuestion';

const EditQuestionForm = ({ setIsOpen, setNotification, setRefresh }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { field } = useController({
    name: "name",
    control,
    defaultValue: EditorState.createEmpty()
  });
  const { buttonLoading, question } = useSelector(state => state.ReducerQuestion);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(question?.name))
  ));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    return field.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleQuestion = async (data) => {
    dispatch(updateQuestion(question?._id, data, question?.name, setIsOpen, setNotification, setRefresh, navigate));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleQuestion)}>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Pertanyaan'}</Paragraph>
        <div className={styles.wysiwyg}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            onBlur={field.onBlur}
            editorStyle={{ height: "200px" }}
          />
        </div>
        {errors.name && errors.name.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Skor Maksimal'}</Paragraph>
        <Input>
          <input type={'number'} {...register('max_score', { required: true })} defaultValue={question?.max_score}/>
        </Input>
        {errors.max_score && errors.max_score.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Waktu Pertanyaan'}</Paragraph>
        <Input>
          <input type={'number'} {...register('question_time', { required: true })} defaultValue={question?.question_time} />
        </Input>
        {errors.question_time && errors.question_time.type === 'required' && (
          <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <div className={styles['form-field']}>
        <Paragraph variant={'body-2'}>{'Waktu Menjawab'}</Paragraph>
        <Input>
          <input type={'number'} {...register('answer_time', { required: true })} defaultValue={question?.answer_time} />
        </Input>
        {errors.answer_time && errors.answer_time.type === 'required' && (
            <p className={styles.error}>{'*Required field*'}</p>
        )}
      </div>
      <Button variant={'primary'} type={'submit'}>
        {buttonLoading ? <Spinner variant={'button'} /> : 'Update Pertanyaan'}
      </Button>
    </form>
  );
};

export default EditQuestionForm;
