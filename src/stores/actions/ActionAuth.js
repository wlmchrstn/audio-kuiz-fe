import axios from 'axios';
import {
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  VERIFY_ACCOUNT,
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
        auth: response.result.teacher,
        verification: response.result.teacher.status,
      },
    });

    if (response.result.teacher.status === 'Unverified') {
      navigate(`/verify-account/${response.result.teacher._id}`, { replace: true });
    } else {
      navigate('/teacher', { replace: true });
    }
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
        auth: response.result.student,
        verification: response.result.student.status,
      },
    });
    if (response.result.student.status === 'Unverified') {
      navigate(`/verify-account/${response.result.student._id}`, { replace: true });
    } else {
      navigate('/student', { replace: true });
    }
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

export const checkVerification = (id, role) => async dispatch => {
  try {
    dispatch({
      type: VERIFY_ACCOUNT,
      payload: {
        loading: true,
      }
    });

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/${role}/get-id/${id}`
    );

    if (response.result.status === 'Unverified') {
      return dispatch({
        type: VERIFY_ACCOUNT,
        payload: {
          loading: false,
          verification: 'unverified',
        }
      });
    } else {
      return dispatch({
        type: VERIFY_ACCOUNT,
        payload: {
          loading: false,
          verification: 'verified',
        }
      });
    };
  } catch(error) {
    dispatch({
      type: VERIFY_ACCOUNT,
      payload: {
        loading: false,
        message: 'Account Not Verified',
        messageStatus: 'failed'
      }
    })
  }
}

export const sendVerificationRequest = (id, role, notification) => async dispatch => {
  try {
    dispatch({
      type: VERIFY_ACCOUNT,
      payload: {
        buttonLoading: false,
      }
    })

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/${role}/request-verify/${id}`
    );

    dispatch({
      type: VERIFY_ACCOUNT,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
      }
    })

    notification(true);
  } catch(error) {
    dispatch({
      type: VERIFY_ACCOUNT,
      payload: {
        buttonLoading: false,
        message: 'Failed to sent request, try again in 5 minutes',
        messageStatus: 'failed'
      }
    });

    notification(true);
  }
};
