import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  TEACHER_GET_ALL,
  TEACHER_CREATE_SUCCESS,
  TEACHER_CREATE_FAIL,
} from './types';

export const getTeacherAll = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_GET_ALL,
      payload: {
        loading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/get-all`
    );

    dispatch({
      type: TEACHER_GET_ALL,
      payload: {
        loading: false,
        teacherList: response.result
      },
    });
  } catch (error) {
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
      type: TEACHER_GET_ALL,
      payload: {
        loading: false,
      }
    });

    notification(true);
  };
};

export const createTeacher = (data, modal, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_CREATE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/create`,
      data,
    );

    dispatch({
      type: TEACHER_CREATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: 'Teacher created',
        messageStatus: 'success',
        teacher: response.result,
      },
    });

    modal(false);
    notification(true);
    refresh(prev => !prev);
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
      type: TEACHER_CREATE_FAIL,
      payload: {
        loading: false,
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed'
      }
    });

    notification(true);
  }
};
