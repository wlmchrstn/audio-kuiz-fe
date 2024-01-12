import {
  EXAM_RESULT_CREATE_SUCCESS,
  EXAM_RESULT_CREATE_FAIL,
  EXAM_RESULT_GET_STUDENT_SUCCESS,
  EXAM_RESULT_GET_STUDENT_FAIL,
  EXAM_RESULT_FINISH,
  EXAM_RESULT_GET_BY_ID,
  EXAM_RESULT_GET_BY_EXAM_ID,
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
      major: {},
      email: '',
      status: '',
    },
    exam: {
      id: '',
      exam_title: '',
      exam_code: '',
      major: {},
      exam_date: null,
      exam_deadline: null,
      exam_type: '',
      status: '',
    },
    answers: []
  },
  score: 0,
  totalScore: 0,
};

const ReducerExamResult = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case EXAM_RESULT_CREATE_SUCCESS:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        examResult: payload.examResult,
      }
    case EXAM_RESULT_CREATE_FAIL:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'failed',
      }
    case EXAM_RESULT_GET_STUDENT_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'success',
        examResultList: payload.examResultList,
      }
    case EXAM_RESULT_GET_STUDENT_FAIL:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'failed',
      }
    case EXAM_RESULT_FINISH:
      return {
        ...state,
        message: payload.message,
        messageStatus: 'success',
        examResult: payload.examResult,
      }
    case EXAM_RESULT_GET_BY_ID:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        examResult: payload.examResult,
        score: payload.score,
        totalScore: payload.totalScore,
      }
    case EXAM_RESULT_GET_BY_EXAM_ID:
      return {
        ...state, loading: payload.loading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        examResultList: payload.examResultList,
      }
    default:
      return state;
  }
};

export default ReducerExamResult;
