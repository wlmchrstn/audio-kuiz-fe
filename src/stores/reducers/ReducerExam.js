import {
    EXAM_CREATE_SUCCESS,
    EXAM_CREATE_FAIL,
    EXAM_SHOW_ALL,
    EXAM_GET_EDIT,
    EXAM_UPDATE_SUCCESS,
    EXAM_UPDATE_FAIL,
    EXAM_PUBLISH,
    EXAM_UNPUBLISH,
    EXAM_DELETE,
    EXAM_TAKE_CODE_SUCCESS,
    EXAM_TAKE_CODE_FAIL,
} from '../actions/types'

const initialState = {
  loading: false,
  buttonLoading: false,
  deleteButtonLoading: false,
  message: '',
  messageStatus: '',
  examList: [],
  exam: {
    id: '',
    exam_title: '',
    exam_code: '',
    prodi: '',
    exam_date: null,
    exam_deadline: null,
    exam_type: '',
    status: '',
    teacher: '',
  },
  examQuestionList: [],
  teacher: {},
};

const ReducerExam = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case EXAM_CREATE_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        exam: payload.data,
      }
    case EXAM_CREATE_FAIL:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'failed',
      }
    case EXAM_SHOW_ALL:
      return {
        ...state,
        loading: payload.loading,
        questionLoading: payload.questionLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        examList: payload.data,
      }
    case EXAM_GET_EDIT:
      return {
        ...state,
        loading: payload.loading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        exam: payload.exam,
        examQuestionList: payload.examQuestionList,
      }
    case EXAM_UPDATE_SUCCESS:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        exam: payload.exam,
      }
    case EXAM_UPDATE_FAIL:
      return {
        ...state,
        buttonLoading: false,
        message: payload.message,
        messageStatus: 'failed'
      }
    case EXAM_PUBLISH:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        exam: payload.exam,
      }
    case EXAM_UNPUBLISH:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        exam: payload.exam,
      }
    case EXAM_DELETE:
      return {
        ...state,
        deleteButtonLoading: payload.deleteButtonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
      }
    case EXAM_TAKE_CODE_SUCCESS:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'success',
        exam: payload.exam,
        examQuestionList: payload.examQuestionList,
        teacher: payload.teacher,
      }
    case EXAM_TAKE_CODE_FAIL:
      return {
        ...state,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: 'failed',
      }
    default:
      return state;
  }
}

export default ReducerExam;
