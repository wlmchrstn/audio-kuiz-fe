import axios from "axios";
import { setToken } from '../../utils/helper';
import {
    UNAUTHENTICATED,
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_FAIL,
} from './types';

export const createQuestion = (id, data, modal, notification, setRefresh, navigate) => async dispatch => {
    try {
        dispatch({
            type: QUESTION_CREATE_SUCCESS,
            payload: {
                buttonLoading: true,
            },
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/question/create/${id}`,
            data,
        );

        dispatch({
            type: QUESTION_CREATE_SUCCESS,
            payload: {
                loading: false,
                buttonLoading: false,
                message: response.message,
                question: response.result,
            }
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
            type: QUESTION_CREATE_FAIL,
            payload: {
                loading: false,
                buttonLoading: false,
                message: error.response.data.message || 'Unexpected Error',
            }
        })

        notification(true);
    }
}