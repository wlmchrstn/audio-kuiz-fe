import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './exam-result-card.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

const ExamResultCard = ({ value }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Title
          tagElement={'h2'}
          className={styles['exams-name']}
          variant={'title-1'}
          weight={'bold'}
        >{value.exam.exam_title}</Title>
      <Paragraph variant={'body-2'}>
        {`Exam Date: ${moment(value.exam.exam_date).format('LLLL')}`}
      </Paragraph>
      <Paragraph variant={'body-2'}>
        {`Teacher: ${value.exam.teacher.name}`}
      </Paragraph>
      <div className={styles.button} onClick={() => navigate(`/student-result/${value._id}`)}>
        <Button type={'button'} variant={'primary'}>{'See exam result'}</Button>
      </div>
    </div>
  );
};

export default ExamResultCard;
