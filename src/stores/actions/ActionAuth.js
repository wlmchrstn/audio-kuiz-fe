import axios from 'axios';
import {
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
} from './types';

export const loginTeacher = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_LOGIN_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/login`,
      data
    );

    dispatch({
      type: TEACHER_LOGIN_SUCCESS,
      payload: {
        token: response.result.token,
        role: response.result.role,
        buttonLoading: false,
        message: response.message,
      },
    });

    navigate('/teacher', { replace: true });
  } catch(error) {
    dispatch({
      type: TEACHER_LOGIN_FAIL,
      payload: {
        message: error.response.data.message,
      }
    });

    notification(true);
  };
};

export const loginStudent = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/student/login`,
      data
    );

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: {
        token: response.result.token,
        role: response.result.role,
        buttonLoading: false,
        message: response.message,
      },
    });

    navigate('/student', { replace: true });
  } catch(error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload: {
        message: error.response.data.message,
      }
    });

    notification(true);
  };
};

export const loginAdmin = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/admin/login`,
      data
    );

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {
        token: response.result.token,
        role: response.result.role,
        buttonLoading: false,
        message: response.message,
      },
    });

    navigate('/admin', { replace: true });
  } catch(error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: {
        message: error.response.data.message,
      }
    });

    notification(true);
  }
};
