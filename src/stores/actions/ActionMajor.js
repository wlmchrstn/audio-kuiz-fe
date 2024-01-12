import axios from "axios";
import { setToken } from '../../utils/helper';
import {
  MAJOR_GET,
  MAJOR_GET_ALL,
  MAJOR_CREATE_SUCCESS,
  MAJOR_CREATE_FAIL,
  MAJOR_UPDATE_SUCCESS,
  MAJOR_UPDATE_FAIL,
  MAJOR_DELETE_FAIL,
  MAJOR_DELETE_SUCCESS,
} from './types';

export const createMajor = (data, notification, modal, refresh) => async dispatch => {
  try {
    dispatch({
      type: MAJOR_CREATE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/major/create`,
      data
    );

    dispatch({
      type: MAJOR_CREATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        major: response.result
      }
    });

    modal(false);
    refresh(prev => !prev);
  } catch(error) {
    dispatch({
      type: MAJOR_CREATE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
};

export const getMajorAll = (notification) => async dispatch => {
  try {
    dispatch({
      type: MAJOR_GET_ALL,
      payload: {
        loading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/major/get-all`
    );

    dispatch({
      type: MAJOR_GET_ALL,
      payload: {
        loading: false,
        majorList: response.result,
      },
    });
  } catch(error) {
    dispatch({
      type: MAJOR_GET_ALL,
      payload: {
        loading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
};

export const getMajor = (id, notification) => async dispatch => {
  try {
    dispatch({
      type: MAJOR_GET,
      payload: {
        loading: true,
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/major/get-id/${id}`
    );

    dispatch({
      type: MAJOR_GET,
      payload: {
        loading: false,
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        major: response.result
      }
    })
  } catch(error) {
    dispatch({
      type: MAJOR_DELETE_FAIL,
      payload: {
        loading: false,
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
}

export const updateMajor = (id, data, modal, notification, refresh) => async dispatch => {
  try {
    dispatch({
      type: MAJOR_UPDATE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/major/update/${id}`,
      {
        name: data.name
      },
    );

    dispatch({
      type: MAJOR_UPDATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        major: response.result,
      }
    });

    modal(false);
    refresh(prev => !prev);
    notification(true);
  } catch(error) {
    dispatch({
      type: MAJOR_UPDATE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
};

export const deleteMajor = (id, notification, refresh) => async dispatch => {
  try {
    dispatch({
      type: MAJOR_DELETE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    };

    const { data: response } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/major/delete/${id}`
    );

    dispatch({
      type: MAJOR_DELETE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
      }
    });

    notification(true);
    refresh(prev => !prev);
  } catch(error) {
    dispatch({
      type: MAJOR_DELETE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  }
}
