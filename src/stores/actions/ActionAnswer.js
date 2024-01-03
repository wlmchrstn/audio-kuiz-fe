import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  EXAM_RESULT_FINISH,
  ANSWER_UPDATE_SCORE_SUCCESS,
  ANSWER_UPDATE_SCORE_FAIL,
} from './types';

export const createAnswer = (questionId, examResultId, data, setStep, examStep, setExamStep, setQuestionNumber, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: ANSWER_CREATE_SUCCESS,
      payload: {
        loading: true
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const reader = new FileReader();
    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let req = {
            answer: reader.result
          };

          axios.post(`${process.env.REACT_APP_BASE_URL}/api/answer/create/${examResultId}/${questionId}`, req)
            .then((response) => {
              dispatch({
                type: ANSWER_CREATE_SUCCESS,
                payload: {
                  loading: false,
                  message: response.message,
                  messageStatus: 'success',
                  answer: response.data.result,
                },
              });
            });
        };
      });

    if (examStep === 'final') {
      const { data: response } = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/exam-result/finish/${examResultId}`);
      dispatch({
        type: EXAM_RESULT_FINISH,
        payload: {
          message: response.message,
          messageStatus: 'success',
          examResult: response.result,
        },
      });
      console.log(response.result);
      setStep('finish');
    } else {
      setQuestionNumber(prev => prev+1);
      setExamStep('question');
    };
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/student-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: ANSWER_CREATE_FAIL,
      payload: {
        loading: false,
        messageStatus: 'failed',
        message: error.response.data.message || 'Unexpected Error',
      },
    });

    notification(true);
  }
};

export const updateAnswerScore = (id, data, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: ANSWER_UPDATE_SCORE_SUCCESS,
      payload: {
        loading: true
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/answer/score/${id}`,
      data
    );

    dispatch({
      type: ANSWER_UPDATE_SCORE_SUCCESS,
      payload: {
        loading: false,
        message: response.message,
        messageStatus: 'success',
        answer: response.result
      },
    });

    refresh(prev => !prev);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: ANSWER_UPDATE_SCORE_FAIL,
      payload: {
        buttonLoading: false,
        messageStatus: 'failed',
        message: error.response.data.message || 'Unexpected Error',
      },
    });

    notification(true);
  };
};
