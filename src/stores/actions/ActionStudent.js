import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  STUDENT_GET,
  STUDENT_GET_ALL,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
} from './types';

export const getStudent = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_GET,
      payload: {
        loading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/student/get`
    )

    let student = {
      name: response.result.name,
      nim: response.result.nim,
      prodi: response.result.prodi,
      email: response.result.email,
      status: response.result.status
    }

    dispatch({
      type: STUDENT_GET,
      payload: {
        loading: false,
        message: response.message,
        messageStatus: 'success',
        student: student,
        studentExamList: response.result.exam_taken,
      }
    });

    notification(true);
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
      type: STUDENT_GET,
      payload: {
        loading: false,
      }
    });

    notification(true);
  }
};

export const getStudentAll = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_GET_ALL,
      payload: {
        loading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/student/get-all`
    );
    dispatch({
      type: STUDENT_GET_ALL,
      payload: {
        loading: false,
        studentList: response.result
      },
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
      type: STUDENT_GET_ALL,
      payload: {
        loading: false,
      }
    });

    notification(true);
  };
};

export const createStudent = (data, modal, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_CREATE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/student/create`,
      data,
    );

    dispatch({
      type: STUDENT_CREATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: 'Student created',
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
      type: STUDENT_CREATE_FAIL,
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
