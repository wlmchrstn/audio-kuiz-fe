import {
    STUDENT_GET,
    STUDENT_EXAM,
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
    studentExamList: [],
    studentExam: {},
    studentExamAnswer: []
}

export default (state = initialState, action) => {
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
        case STUDENT_EXAM:
            return {
                ...state,
                loading: payload.loading,
                buttonLoading: payload.buttonLoading,
                message: payload.message,
                messageStatus: payload.messageStatus,
                studentExam: payload.studentExam,
                studentExamAnswer: payload.studentExamAnswer,
            }
        default:
            return state;
    }
}