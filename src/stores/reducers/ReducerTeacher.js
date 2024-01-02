import {
  TEACHER_GET_ALL,
  TEACHER_CREATE_SUCCESS,
  TEACHER_CREATE_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  teacherList: [],
  teacher: {
    name: '',
    email: '',
    status: '',
  },
};

const ReducerTeacher = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case TEACHER_GET_ALL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        teacherList: payload.teacherList,
      }
    case TEACHER_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        teacher: payload.teacher,
      }
    case TEACHER_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    default:
      return state;
  };
};

export default ReducerTeacher;
