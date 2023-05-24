import axios from "axios";
import { setToken } from '../../utils/helper';
import {
    UNAUTHENTICATED,
    STUDENT_GET,
    STUDENT_EXAM,
} from './types';

export const getStudent = (notification, navigate) => async dispatch => {
    try {
        dispatch({
            type: STUDENT_GET,
            payload: {
                loading: true,
            }
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/student/get`
        )

        let student = {
            name: response.result.name,
            nim: response.result.nim,
            prodi: response.result.prodi,
            email: response.result.email,
            status: response.result.status
        }

        dispatch({
            type: STUDENT_GET,
            payload: {
                loading: false,
                message: response.message,
                messageStatus: 'success',
                student: student,
                studentExamList: response.result.exam_taken,
            }
        });

        notification(true);
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/');
        }

        dispatch({
            type: STUDENT_GET,
            payload: {
                loading: false,
            }
        });

        notification(true);
    }
};

export const takeStudentExam = (data, notification, navigate) => async dispatch => {
    try {
        dispatch({
            type: STUDENT_EXAM,
            payload: {
                buttonLoading: true,
            }
        });

        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }

        const { data: response } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/student/exam`,
            data
        );

        console.log(response);

        dispatch({
            type: STUDENT_EXAM,
            payload: {
                buttonLoading: false,
                message: response.message,
                messageStatus: 'success',
                studentExam: response.result
            }
        });

        notification(true);
        navigate('/student/exam');
    } catch(error) {
        if (error.response.status === 403) {
            dispatch({
                type: UNAUTHENTICATED,
            });
            navigate('/');
        }

        dispatch({
            type: STUDENT_EXAM,
            payload: {
                buttonLoading: false,
                message: error.response.data.message || 'Unexpected Error',
                messageStatus: 'failed'
            }
        });

        notification(true);
    }
}