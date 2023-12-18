import {
    STUDENT_GET,
} from '../actions/types';

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
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
        studentExamList: payload.studentExamList,
      }
    default:
      return state;
  }
};

export default ReducerStudent;
