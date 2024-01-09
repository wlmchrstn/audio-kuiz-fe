import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  TEACHER_GET,
  TEACHER_GET_ALL,
  TEACHER_CREATE_SUCCESS,
  TEACHER_CREATE_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DELETE_FAIL,
  TEACHER_REQUEST_CHANGE_PASSWORD,
  TEACHER_CHANGE_PASSWORD_SUCCESS,
  TEACHER_CHANGE_PASSWORD_FAIL,
} from './types';

export const getTeacher = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_GET,
      payload: {
        loading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/get`
    );

    dispatch({
      type: TEACHER_GET,
      payload: {
        loading: false,
        teacher: response.result,
      }
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
      type: TEACHER_GET,
      payload: {
        loading: false,
        message: error.response.data.message,
        messageStatus: 'failed',
      }
    });

    notification(true);
  }
}

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
      `${process.env.REACT_APP_BASE_URL}/api/teacher/active`
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
      navigate('/admin-login');
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
      navigate('/admin-login');
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

export const updateTeacher = (data, modal, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_UPDATE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/update`,
      data,
    );

    dispatch({
      type: TEACHER_UPDATE_SUCCESS,
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
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: TEACHER_UPDATE_FAIL,
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

export const deleteTeacher = (id, notification, refresh, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_DELETE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/delete/${id}`
    );

    dispatch({
      type: TEACHER_DELETE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message || 'Teacher deleted',
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
      type: TEACHER_DELETE_FAIL,
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

export const requestChangePasswordTeacher = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: TEACHER_REQUEST_CHANGE_PASSWORD,
      payload: {
        buttonLoading: true,
      }
    });


    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/teacher/request-change-password`
    );

    dispatch({
      type: TEACHER_REQUEST_CHANGE_PASSWORD,
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
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: TEACHER_REQUEST_CHANGE_PASSWORD,
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
      type: TEACHER_CHANGE_PASSWORD_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (data.password !== data.confirm_password) {
      dispatch({
        type: TEACHER_CHANGE_PASSWORD_FAIL,
        payload: {
          buttonLoading: false,
          message: `Password didn't match`,
          messageStatus: 'failed'
        }
      })

      notification(true)
    } else {
      const { data: response } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/teacher/change-password/${id}`,
        {
          password: data.password
        }
      );

      dispatch({
        type: TEACHER_CHANGE_PASSWORD_SUCCESS,
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
      type: TEACHER_CHANGE_PASSWORD_FAIL,
      payload: {
        buttonLoading: false,
        mesage: error.response?.data.message || 'Unexpected error',
        messageStatus: 'failed'
      }
    })

    notification(true);
  }
}
