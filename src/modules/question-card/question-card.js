import React from 'react';
import styles from './question-card.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';

const QuestionCard = ({ value, index, onClick }) => {
  return (
    <div key={index} className={styles['question-container']} onClick={onClick}>
      <div className={styles['question-wrapper']}>
        <div className={styles['question-name']} dangerouslySetInnerHTML={{ __html: value.name }}></div>
      </div>
      <div className={styles['question-wrapper']}>
        <div className={styles['question-left']}>
          <Paragraph variant={'body-1'}>{`Skor maksimal: ${value.max_score}`}</Paragraph>
        </div>
        <div className={styles['question-right']}>
          <Paragraph variant={'body-1'}>{`Waktu pertanyaan: ${value.question_time}`}</Paragraph>
          <Paragraph variant={'body-1'}>{`Waktu menjawab: ${value.answer_time}`}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
