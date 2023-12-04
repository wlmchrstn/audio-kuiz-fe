import {
  EXAM_RESULT_CREATE_SUCCESS,
  EXAM_RESULT_GET_STUDENT_SUCCESS
} from '../actions/types'

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  examResultList: [],
  examResult: {
    student: {
      name: '',
      nim: '',
      prodi: '',
      email: '',
      status: '',
    },
    exam: {
      id: '',
      exam_title: '',
      exam_code: '',
      prodi: '',
      exam_date: null,
      exam_deadline: null,
      exam_type: '',
      status: '',
    },
    answers: []
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case EXAM_RESULT_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        examResult: payload.data,
      }
    case EXAM_RESULT_GET_STUDENT_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        examResultList: payload.data,
      }
    case EXAM_RESULT_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'failed'
      }
    default:
      return state;
  }
}