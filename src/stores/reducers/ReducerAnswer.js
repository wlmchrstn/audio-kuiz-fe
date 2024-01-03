import {
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  ANSWER_UPDATE_SCORE_SUCCESS,
  ANSWER_UPDATE_SCORE_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  message: '',
  messageStatus: '',
  answer: {},
};

const ReducerAnswer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ANSWER_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'success',
        answer: payload.answer,
      }
    case ANSWER_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: 'failed',
      }
    case ANSWER_UPDATE_SCORE_SUCCESS:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        answer: payload.answer,
      }
    case ANSWER_UPDATE_SCORE_FAIL:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    default:
      return state;
  }
}

export default ReducerAnswer;
