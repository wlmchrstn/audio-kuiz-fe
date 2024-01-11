import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './question-card.module.scss';

// Assets
import { ReactComponent as DeleteIcon } from '../../assets/icons/fi_trash.svg';

// Components
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { deleteQuestion } from '../../stores/actions/ActionQuestion';

const QuestionCard = ({ value, index, onClick, notification, refresh }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this question?") === true) {
      return dispatch(deleteQuestion(id, notification, refresh, navigate));
    } else {
      return null;
    }
    console.log(id);
  };

  return (
    <div key={index} className={styles['question-container']}>
      <div className={styles['question-wrapper']}>
        <div className={styles['question-name']} dangerouslySetInnerHTML={{ __html: value.name }} onClick={onClick}></div>
        <div className={styles.cta} onClick={() => handleDelete(value._id)}>
          <DeleteIcon stroke='#000' />
        </div>
      </div>
      <div className={styles['question-wrapper']}>
        <div className={styles['question-left']}>
          <Paragraph variant={'body-1'}>{`Max Score: ${value.max_score}`}</Paragraph>
        </div>
        <div className={styles['question-right']}>
          <Paragraph variant={'body-1'}>{`Preparation Time: ${value.question_time}`}</Paragraph>
          <Paragraph variant={'body-1'}>{`Answer Time: ${value.answer_time}`}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
