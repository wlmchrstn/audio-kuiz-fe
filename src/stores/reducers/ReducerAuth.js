import {
    UNAUTHENTICATED,
    LOGOUT,
    TEACHER_REGISTER_SUCCESS,
    TEACHER_REGISTER_FAIL,
    TEACHER_LOGIN_SUCCESS,
    TEACHER_LOGIN_FAIL,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: false,
    role: '',
    loading: false,
    buttonLoading: false,
    message: '',
    messageStatus: '',
    teacher: {
        name: '',
        email: '',
        status: '',
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case UNAUTHENTICATED:
            sessionStorage.removeItem('token');
            return state;
        case LOGOUT:
            sessionStorage.removeItem('token');
            return state;
        case TEACHER_REGISTER_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                role: payload.role,
                loading: payload.loading,
                message: payload.message,
                messageStatus: 'success',
            };
        case TEACHER_REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                message: payload.message,
                messageStatus: 'failed',
            };
        case TEACHER_LOGIN_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                role: payload.role,
                loading: payload.loading,
                message: payload.message,
                messageStatus: 'success'
            };
        case TEACHER_LOGIN_FAIL:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                message: payload.message,
                messageStatus: 'failed',
            };
        case STUDENT_REGISTER_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                role: payload.role,
                loading: payload.loading,
                message: payload.message,
                messageStatus: 'success',
            };
        case STUDENT_REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                message: payload.message,
                messageStatus: 'failed',
            };
        case STUDENT_LOGIN_SUCCESS:
            sessionStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                role: payload.role,
                loading: payload.loading,
                message: payload.message,
                messageStatus: 'success'
            };
        case STUDENT_LOGIN_FAIL:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                message: payload.message,
                messageStatus: 'failed',
            };
        default:
            return state;
    }
}