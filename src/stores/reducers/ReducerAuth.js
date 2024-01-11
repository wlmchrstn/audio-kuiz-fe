import {
  UNAUTHENTICATED,
  LOGOUT,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  VERIFY_ACCOUNT,
} from '../actions/types';

const initialState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: false,
  role: '',
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  auth: {
    id: ''
  },
  verification: '',
}

const ReducerAuth = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case UNAUTHENTICATED:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('verification');
      return state;
    case LOGOUT:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('verification');
      return state;
    case TEACHER_LOGIN_SUCCESS:
      sessionStorage.setItem('token', payload.token);
      sessionStorage.setItem('role', payload.role);
      sessionStorage.setItem('verification', payload.verification);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        role: payload.role,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        auth: payload.auth,
        verification: payload.verification,
      };
    case TEACHER_LOGIN_FAIL:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('verification');
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
      sessionStorage.setItem('role', payload.role);
      sessionStorage.setItem('verification', payload.verification);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        role: payload.role,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        auth: payload.auth,
        verification: payload.verification,
      };
    case STUDENT_LOGIN_FAIL:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('verification');
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
    case VERIFY_ACCOUNT:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus
      }
    default:
      return state;
  };
};

export default ReducerAuth;
