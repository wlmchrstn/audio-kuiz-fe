import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
  ADMIN_GET,
} from './types';

export const getAdmin = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: ADMIN_GET,
      payload: {
        loading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/admin/get`
    )

    dispatch({
      type: ADMIN_GET,
      payload: {
        loading: false,
        message: response.message || 'Get Admin',
        messageStatus: 'success',
        admin: response.result,
      }
    });
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/admin-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: ADMIN_GET,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected error',
        messageStatus: 'failed',
      }
    });

    notification(true);
  };
};