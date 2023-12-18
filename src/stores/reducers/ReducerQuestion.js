import {
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_GET_FOR_EDIT,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  message: '',
  messageStatus: '',
  question: {
    id: '',
    name: '',
    answer: '',
    max_score: null,
    question_time: null,
    answer_time: null,
  },
  questionList: []
}

const ReducerQuestion = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case QUESTION_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'success',
        question: payload.data,
      }
    case QUESTION_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'failed',
      }
    case QUESTION_GET_FOR_EDIT:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        question: payload.question,
      }
    case QUESTION_UPDATE_SUCCESS:
      return {
        ...state,
        buttonLoading: payload.loading,
        message: payload.message,
        messageStatus: 'success',
        question: payload.question,
      }
    case QUESTION_UPDATE_FAIL:
      return {
        ...state,
        buttonLoading: payload.loading,
        message: payload.message,
        messageStatus: 'failed',
      }
    default:
      return state;
  };
};

export default ReducerQuestion;
