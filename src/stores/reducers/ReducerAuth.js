import {
  UNAUTHENTICATED,
  LOGOUT,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
} from '../actions/types';

const initialState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: false,
  role: '',
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
}

const ReducerAuth = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case UNAUTHENTICATED:
      sessionStorage.removeItem('token');
      return state;
    case LOGOUT:
      sessionStorage.removeItem('token');
      return state;
    case TEACHER_LOGIN_SUCCESS:
      sessionStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        role: payload.role,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success'
      };
    case TEACHER_LOGIN_FAIL:
      sessionStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        role: '',
        loading: false,
        buttonLoading: false,
        message: payload.message,
        messageStatus: 'failed',
      };
    case STUDENT_LOGIN_SUCCESS:
      sessionStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        role: payload.role,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success'
      };
    case STUDENT_LOGIN_FAIL:
      sessionStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        role: '',
        loading: false,
        buttonLoading: false,
        message: payload.message,
        messageStatus: 'failed',
      };
    case ADMIN_LOGIN_SUCCESS:
      sessionStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        role: payload.role,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
      };
    case ADMIN_LOGIN_FAIL:
      sessionStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        role: '',
        loading: false,
        buttonLoading: false,
        message: payload.message,
        messageStatus: 'failed',
      };
    default:
      return state;
  };
};

export default ReducerAuth;
