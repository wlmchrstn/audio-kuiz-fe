import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  EXAM_RESULT_CREATE_SUCCESS,
  EXAM_RESULT_CREATE_FAIL,
  EXAM_RESULT_GET_STUDENT_SUCCESS,
  EXAM_RESULT_GET_STUDENT_FAIL,
  EXAM_RESULT_GET_BY_ID,
  EXAM_RESULT_GET_BY_EXAM_ID
} from './types';

export const createExamResult = (id, setStep, setExamStep, notification, navigate) => async dispatch => {
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
        examResult: result,
      },
    });

    setStep('start');
    setExamStep('question');
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

export const getStudentExamResult = (notification, navigate) => async dispatch => {
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

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/exam-result/get-student`
    );

    dispatch({
      type: EXAM_RESULT_GET_STUDENT_SUCCESS,
      payload: {
        loading: false,
        examResultList: response.result,
      }
    });
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
      type: EXAM_RESULT_GET_STUDENT_FAIL,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  };
};

export const getExamResultById = (id, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_RESULT_GET_BY_ID,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/exam-result/get-exam-result/${id}`)

    dispatch({
      type: EXAM_RESULT_GET_BY_ID,
      payload: {
        loading: false,
        message: response.result.message,
        messageStatus: 'success',
        examResult: response.result
      },
    });
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_RESULT_GET_BY_ID,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
};

export const getExamResultByExamId = (id, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_RESULT_GET_BY_EXAM_ID,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/exam-result/get-all/${id}`);

    dispatch({
      type: EXAM_RESULT_GET_BY_EXAM_ID,
      payload: {
        loading: false,
        message: response.result.message,
        messageStatus: 'success',
        examResultList: response.result
      },
    });
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
      type: EXAM_RESULT_GET_BY_EXAM_ID,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
};
