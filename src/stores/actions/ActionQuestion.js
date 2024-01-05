import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_GET_FOR_EDIT,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
} from './types';

export const createQuestion = (id, data, modal, notification, setRefresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/question/create/${id}`,
      data,
    );

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: {
        loading: false,
        message: response.message,
        data: response.result,
      }
    });

    modal(false);
    notification(true);
    setRefresh(prev => !prev);
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
      type: QUESTION_CREATE_FAIL,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected Error',
      }
    })

    notification(true);
  };
};

export const getQuestionForEdit = (id, modal, navigate) => async dispatch => {
  try {
    dispatch({
      type: QUESTION_GET_FOR_EDIT,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/question/get-id/${id}`
    );

    dispatch({
      type: QUESTION_GET_FOR_EDIT,
      payload: {
        loading: false,
        question: response.result,
      }
    });

    modal(true);
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
      type: QUESTION_GET_FOR_EDIT,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed'
      }
    });
  };
};

export const updateQuestion = (id, data, name, modal, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: QUESTION_UPDATE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    let question;

    if (typeof data.name === 'object') {
      question = name;
    } else {
      question = data.name;
    }

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/question/update/${id}`,
      {
        name: question,
        answer: data.answer,
        max_score: data.max_score,
        question_time: data.question_time,
        answer_time: data.answer_time,
      }
    );

    dispatch({
      type: QUESTION_UPDATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        question: response.result,
      }
    });

    modal(false);
    refresh(prev => !prev);
    notification(true);
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
      type: QUESTION_UPDATE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      }
    })

    notification(true);
  };
};
