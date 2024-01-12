import {
  MAJOR_GET,
  MAJOR_GET_ALL,
  MAJOR_CREATE_SUCCESS,
  MAJOR_CREATE_FAIL,
  MAJOR_UPDATE_SUCCESS,
  MAJOR_UPDATE_FAIL,
  MAJOR_DELETE_SUCCESS,
  MAJOR_DELETE_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  majorList: [],
  major: {},
};

const ReducerMajor = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case MAJOR_GET:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        major: payload.major,
      }
    case MAJOR_GET_ALL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        majorList: payload.majorList,
      }
    case MAJOR_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        major: payload.major,
      }
    case MAJOR_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case MAJOR_UPDATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        major: payload.major,
      }
    case MAJOR_UPDATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        major: payload.major,
      }
    case MAJOR_DELETE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case MAJOR_DELETE_FAIL:
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

export default ReducerMajor;
