import {
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
  STUDENT_CHANGE_PASSWORD_FAIL
} from '../actions/types';

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  studentList: [],
  student: {
    name: '',
    nim: '',
    major: {},
    email: '',
    status: '',
  },
}

const ReducerStudent = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case STUDENT_GET:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        student: payload.student,
      }
    case STUDENT_GET_ALL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        studentList: payload.studentList,
      }
    case STUDENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        student: payload.student,
      }
    case STUDENT_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        student: payload.student,
      }
    case STUDENT_UPDATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_DELETE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_REQUEST_CHANGE_PASSWORD:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case STUDENT_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    default:
      return state;
  }
};

export default ReducerStudent;
