import {
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_FAIL,
} from '../actions/types';

const initialState = {
    loading: false,
    buttonLoading: false,
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

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case QUESTION_CREATE_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                buttonLoading: payload.buttonLoading,
                message: payload.message,
                messageStatus: 'success',
                question: payload.data,
            }
        case QUESTION_CREATE_FAIL:
            return {
                ...state,
                loading: payload.loading,
                buttonLoading: payload.buttonLoading,
                message: payload.message,
                messageStatus: 'failed',
            }
        default:
            return state;
    }
}