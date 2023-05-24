import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
    UNAUTHENTICATED,
    EXAM_CREATE_SUCCESS,
    EXAM_CREATE_FAIL,
    EXAM_SHOW_ACTIVE,
    EXAM_GET_EDIT,
    EXAM_PUBLISH,
} from './types';

export const createExam = (data, modal, notification, setRefresh, navigate) => async dispatch => {
    try {
        dispatch({
            type: EXAM_CREATE_SUCCESS,
            payload: {
                buttonLoading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/exam/create`,
            data,
        );

        let result = {
            id: response.result._id,
            name: response.result.name,
            examCode: response.result.exam_code,
            prodi: response.result.prodi,
            examDate: response.result.exam_date,
            status: response.result.status,
            teacher: response.result.teacher.name
        }

        dispatch({
            type: EXAM_CREATE_SUCCESS,
            payload: {
                buttonLoading: false,
                message: response.message,
                data: result,
            },
        });

        modal(false);
        notification(true);
        setRefresh(prev => !prev);
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/teacher-login');
        }

        dispatch({
            type: EXAM_CREATE_FAIL,
            paylod: {
                message: error.response.data.message || 'Unexpected Error',
                buttonLoading: false,
                loading: false,
            },
        });

        notification(true);
    }
};

export const getActiveExam = (notification, navigate) => async dispatch => {
    try {
        dispatch({
            type: EXAM_SHOW_ACTIVE,
            payload: {
                loading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/exam/active`
        );

        console.log(response);

        dispatch({
            type: EXAM_SHOW_ACTIVE,
            payload: {
                loading: false,
                message: response.message,
                messageStatus: 'success',
                data: response.result,
            },
        });

        notification(true);
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/teacher-login');
        }

        dispatch({
            type: EXAM_CREATE_FAIL,
            paylod: {
                message: error.response.data.message || 'Unexpected Error',
                messageStatus: 'failed',
                buttonLoading: false,
                loading: false,
            },
        });

        notification(true);
    }
};

export const getExamEdit = (id, notification, navigate) => async dispatch => {
    try {
        dispatch({
            type: EXAM_GET_EDIT,
            payload: {
                loading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/exam/get-id/${id}`
        );

        let result = {
            id: response.result._id,
            name: response.result.name,
            examCode: response.result.exam_code,
            prodi: response.result.prodi,
            examDate: response.result.exam_date,
            status: response.result.status,
            teacher: response.result.teacher.name
        }

        dispatch({
            type: EXAM_GET_EDIT,
            payload: {
                loading: false,
                message: response.message,
                messageStatus: 'success',
                exam: result,
                question: response.result.questions
            }
        });

        notification(true);
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/teacher-login');
        }

        dispatch({
            type: EXAM_GET_EDIT,
            paylod: {
                message: error.response.data.message || 'Unexpected Error',
                messageStatus: 'failed',
                buttonLoading: false,
                loading: false,
            },
        });

        notification(true);
    }
};

export const publishExam = (id, data, notification, setRefresh, navigate) => async dispatch => {
    try {
        dispatch({
            type: EXAM_PUBLISH,
            payload: {
                loading: true,
                buttonLoading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/exam/publish/${id}`,
            data,
        );

        let result = {
            id: response.result._id,
            name: response.result.name,
            examCode: response.result.exam_code,
            prodi: response.result.prodi,
            examDate: response.result.exam_date,
            status: response.result.status,
            teacher: response.result.teacher.name
        }

        dispatch({
            type: EXAM_PUBLISH,
            payload: {
                loading: false,
                buttonLoading: false,
                message: response.message,
                messageStatus: 'success',
                exam: result,
            }
        });

        setRefresh(prev => !prev);
        notification(true);
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/teacher-login');
        }

        dispatch({
            type: EXAM_PUBLISH,
            paylod: {
                message: error.response.data.message || 'Unexpected Error',
                messageStatus: 'failed',
                buttonLoading: false,
                loading: false,
            },
        });

        notification(true);
    }
}