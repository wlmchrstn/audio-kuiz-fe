import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  EXAM_RESULT_CREATE_SUCCESS,
  EXAM_RESULT_GET_STUDENT_SUCCESS
} from './types';

export const createExamResult = (id, step, notification, setRefresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_RESULT_CREATE_SUCCESS,
      payload: {
        buttonLoading: true
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/exam-result/create/${id}`,
    );

    let result = {
      id: response.result._id,
      student: response.result.student,
      exam: response.result.exam,
      answers: response.result.answers
    };

    dispatch({
      type: EXAM_RESULT_CREATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        data: result,
      },
    });

    notification(true);
    step();
    setRefresh(prev => !prev);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    }

    dispatch({
      type: EXAM_RESULT_CREATE_FAIL,
      payload: {
        buttonLoading: false,
        loading: false,
        messageStatus: 'failed',
        message: error.response.data.message || 'Unexpected Error',
      },
    });

    notification(true);
  }
};

export const getStudentExamResult = (notification, setRefresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_RESULT_GET_STUDENT_SUCCESS,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/exam-result/get-student`
    );

  } catch(error) {
    dispatch({
      type: EXAM_RESULT_GET_STUDENT_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        data: result,
      },
    });
  }
}