import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import styles from './exam-card.module.scss';
import { copyToClipboard } from '../../utils/helper';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';

const ExamCard = ({ value, setClipboard }) => {
  const navigate = useNavigate();
  const { major, status, exam_title, exam_code, exam_date, exam_deadline, teacher, _id } = value;

  return (
    <div className={styles['exams-item']}>
      <Title
        tagElement={'h2'}
        className={styles['exams-name']}
        variant={'heading-1'}
        weight={'bold'}
      >{exam_title}</Title>
      <div className={styles.content}>
        <div className={styles['exams-wrapper']}>
          <Paragraph variant={'body-2'} className={styles['exams-major']}>{major.name}</Paragraph>
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
              color={'black'}
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
    </div>
  );
};

export default ExamCard;
