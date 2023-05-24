import {
    EXAM_CREATE_SUCCESS,
    EXAM_CREATE_FAIL,
    EXAM_SHOW_ACTIVE,
    EXAM_GET_EDIT,
    EXAM_PUBLISH,
} from '../actions/types'

const initialState = {
    loading: false,
    buttonLoading: false,
    questionLoading: false,
    message: '',
    messageStatus: '',
    examList: [],
    exam: {
        id: '',
        name: '',
        examCode: '',
        prodi: '',
        examDate: null,
        status: '',
        teacher: '',
    },
    examQuestionList: []
};

export default (state = initialState, action) => {
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
        case EXAM_SHOW_ACTIVE:
            return {
                ...state,
                loading: payload.loading,
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
                examQuestionList: payload.question,
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
        default:
            return state;
    }
}
