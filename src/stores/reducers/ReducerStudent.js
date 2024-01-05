import {
  STUDENT_GET,
  STUDENT_GET_ALL,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
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
    prodi: '',
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
    default:
      return state;
  }
};

export default ReducerStudent;
