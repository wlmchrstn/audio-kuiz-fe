import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
  TEACHER_REGISTER_SUCCESS,
  TEACHER_REGISTER_FAIL,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
} from './types';

export const registerTeacher = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_REGISTER_SUCCESS,
      payload: {
        loading: true
      },
    });

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/create`,
      data
    );

    const bodyLogin = {
      email: data.email,
      password: data.password,
    };

    const { data: login } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/login`,
      bodyLogin
    );

    dispatch({
      type: TEACHER_REGISTER_SUCCESS,
      payload: {
        token: login.result.token,
        role: response.result.role,
        loading: false,
        message: login.message,
      },
    });

    navigate('/teacher', { replace: true });
  } catch(error) {
    dispatch({
      type: TEACHER_REGISTER_FAIL,
      payload: {
        message: error.response.data.message,
      },
    });

    notification(true);
  }
}

export const loginTeacher = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_LOGIN_SUCCESS,
      payload: {
        loading: true,
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
        loading: false,
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
  }
}

export const registerStudent = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: {
        loading: true
      },
    });

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/student/create`,
      data
    );

    const bodyLogin = {
      nim: data.nim,
      password: data.password,
    };

    const { data: login } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/student/login`,
      bodyLogin
    );

    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: {
        token: login.result.token,
        role: response.result.role,
        loading: false,
        message: login.message,
      },
    });

    navigate('/student', { replace: true });
  } catch(error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload: {
        message: error.response.data.message,
      },
    });

    notification(true);
  }
}

export const loginStudent = (data, navigate, notification) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: {
        loading: true,
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
        loading: false,
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
  }
}
