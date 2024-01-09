import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  STUDENT_GET,
  STUDENT_GET_ALL,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENT_REQUEST_CHANGE_PASSWORD,
  STUDENT_CHANGE_PASSWORD_SUCCESS,
  STUDENT_CHANGE_PASSWORD_FAIL,
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

    dispatch({
      type: STUDENT_GET,
      payload: {
        loading: false,
        student: response.result,
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
      type: STUDENT_GET,
      payload: {
        loading: false,
        message: error.response.data.message,
        messageStatus: 'failed',
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
      `${process.env.REACT_APP_BASE_URL}/api/student/active`
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
      navigate('/admin-login');
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
      navigate('/admin-login');
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

export const updateStudent = (data, modal, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/student/update`,
      data,
    );

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        teacher: response.result,
      }
    });

    notification(true);
    modal(false);
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
      type: STUDENT_UPDATE_FAIL,
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

export const deleteStudent = (id, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/student/delete/${id}`
    );

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message || 'Student deleted',
        messageStatus: 'success',
      },
    });

    notification(true);
    refresh(prev => !prev);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/admin-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload: {
        loading: false,
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed'
      }
    });

    notification(true);
  };
};

export const requestChangePasswordStudent = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_REQUEST_CHANGE_PASSWORD,
      payload: {
        buttonLoading: true,
      }
    });


    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/student/request-change-password`
    );

    dispatch({
      type: STUDENT_REQUEST_CHANGE_PASSWORD,
      payload: {
        buttonLoading: true,
        message: response.message,
        messageStatus: 'success'
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
      type: STUDENT_REQUEST_CHANGE_PASSWORD,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed'
      }
    });

    notification(true);
  }
};

export const changePasswordTeacher = (id, data, notification, view) => async dispatch => {
  try {
    dispatch({
      type: STUDENT_CHANGE_PASSWORD_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (data.password !== data.confirm_password) {
      dispatch({
        type: STUDENT_CHANGE_PASSWORD_FAIL,
        payload: {
          buttonLoading: false,
          message: `Password didn't match`,
          messageStatus: 'failed'
        }
      })

      notification(true)
    } else {
      const { data: response } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/student/change-password/${id}`,
        {
          password: data.password
        }
      );

      dispatch({
        type: STUDENT_CHANGE_PASSWORD_SUCCESS,
        payload: {
          buttonLoading: false,
          message: response.message,
          messageStatus: 'success',
        }
      })

      view('updated')
      notification(true);
    }
  } catch(error) {
    dispatch({
      type: STUDENT_CHANGE_PASSWORD_FAIL,
      payload: {
        buttonLoading: false,
        mesage: error.response?.data.message || 'Unexpected error',
        messageStatus: 'failed'
      }
    })

    notification(true);
  }
}