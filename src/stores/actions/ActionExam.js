import axios from 'axios';
import { setToken } from '../../utils/helper';
import {
  UNAUTHENTICATED,
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
      exam_title: response.result.exam_title,
      exam_code: response.result.exam_code,
      prodi: response.result.prodi,
      exam_date: response.result.exam_date,
      exam_deadline: response.result.exam_deadline,
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
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_CREATE_FAIL,
      payload: {
        message: error.response.data.message || 'Unexpected Error',
        buttonLoading: false,
        loading: false,
      },
    });

    notification(true);
  };
};

export const getAllExam = (notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_SHOW_ALL,
      payload: {
        loading: true,
        questionLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/exam/active`
    );

    dispatch({
      type: EXAM_SHOW_ALL,
      payload: {
        loading: false,
        questionLoading: false,
        data: response.result,
      },
    });
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_SHOW_ALL,
      payload: {
        loading: false,
        questionLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  };
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
      exam_title: response.result.exam_title,
      exam_code: response.result.exam_code,
      prodi: response.result.prodi,
      exam_date: response.result.exam_date,
      exam_deadline: response.result.exam_deadline,
      exam_type: response.result.exam_type,
      status: response.result.status,
      teacher: response.result.teacher,
    }

    dispatch({
      type: EXAM_GET_EDIT,
      payload: {
        loading: false,
        exam: result,
        examQuestionList: response.result.questions
      }
    });
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_GET_EDIT,
      payload: {
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
        loading: false,
      },
    });

    notification(true);
  };
};

export const updateExam = (id, data, modal, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_UPDATE_SUCCESS,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/exam/update/${id}`,
      data
    );

    let result = {
      id: response.result._id,
      exam_title: response.result.exam_title,
      exam_code: response.result.exam_code,
      prodi: response.result.prodi,
      exam_date: response.result.exam_date,
      exam_deadline: response.result.exam_deadline,
      exam_type: response.result.exam_type,
      status: response.result.status,
      teacher: response.result.teacher,
    };

    dispatch({
      type: EXAM_UPDATE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        exam: result,
      }
    });

    modal(false);
    notification(true);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_UPDATE_FAIL,
      payload: {
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
        buttonLoading: false,
      },
    });

    notification(true);
  };
};

export const publishExam = (id, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_PUBLISH,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/exam/publish/${id}`,
      {}
    );

    let result = {
      id: response.result._id,
      exam_title: response.result.exam_title,
      exam_code: response.result.exam_code,
      prodi: response.result.prodi,
      exam_date: response.result.exam_date,
      exam_deadline: response.result.exam_deadline,
      exam_type: response.result.exam_type,
      status: response.result.status,
      teacher: response.result.teacher,
    }

    dispatch({
      type: EXAM_PUBLISH,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        exam: result,
      }
    });

    notification(true);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_PUBLISH,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  };
};

export const unpublishExam = (id, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_UNPUBLISH,
      payload: {
        buttonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/exam/unpublish/${id}`,
      {}
    );

    let result = {
      id: response.result._id,
      exam_title: response.result.exam_title,
      exam_code: response.result.exam_code,
      prodi: response.result.prodi,
      exam_date: response.result.exam_date,
      exam_deadline: response.result.exam_deadline,
      exam_type: response.result.exam_type,
      status: response.result.status,
      teacher: response.result.teacher,
    }

    dispatch({
      type: EXAM_UNPUBLISH,
      payload: {
        buttonLoading: false,
        message: response.message,
        messageStatus: 'success',
        exam: result,
      }
    });

    notification(true);
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_UNPUBLISH,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  };
};

export const deleteExam = (id, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_DELETE,
      payload: {
        deleteButtonLoading: true,
      },
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/exam/delete/${id}`,
      {}
    );

    dispatch({
      type: EXAM_DELETE,
      payload: {
        deleteButtonLoading: false,
        message: response.message,
        messageStatus: 'success',
      }
    });

    navigate('/teacher');
  } catch(error) {
    if (error.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/teacher-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_DELETE,
      payload: {
        deletebuttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      },
    });

    notification(true);
  };
};

export const takeStudentExam = (data, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_TAKE_CODE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/exam/get-code/${data.exam_code}`
    );

    if (response.success === false) {
      dispatch({
        type: EXAM_TAKE_CODE_FAIL,
        payload: {
          buttonLoading: false,
          message: response.message,
          messageStatus: 'failed',
        }
      })

      notification(true);
    } else {
      let {
        _id, exam_title, exam_code,
        prodi, exam_date, exam_deadline,
        exam_type, status, teacher, questions } = response.result;

      let exam = {
        id: _id,
        exam_title,
        exam_code,
        prodi,
        exam_date,
        exam_deadline,
        exam_type,
        status,
        teacher,
      };


      dispatch({
        type: EXAM_TAKE_CODE_SUCCESS,
        payload: {
          buttonLoading: false,
          message: response.message,
          exam,
          examQuestionList: questions,
        }
      });

      navigate(`/student/exam/${exam_code}`);
    }

  } catch(error) {
    if (error?.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/student-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_TAKE_CODE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
        messageStatus: 'failed',
      }
    });

    notification(true);
  }
}

export const getExamByExamCode = (data, notification, navigate) => async dispatch => {
  try {
    dispatch({
      type: EXAM_TAKE_CODE_SUCCESS,
      payload: {
        buttonLoading: true,
      }
    });

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }

    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/exam/get-code/${data}`
    );

    let {
      _id, exam_title, exam_code,
      prodi, exam_date, exam_deadline,
      exam_type, status, teacher, questions } = response.result;

    let exam = {
      id: _id,
      exam_title,
      exam_code,
      prodi,
      exam_date,
      exam_deadline,
      exam_type,
      status,
      teacher,
    };


    dispatch({
      type: EXAM_TAKE_CODE_SUCCESS,
      payload: {
        buttonLoading: false,
        message: response.message,
        exam,
        examQuestionList: questions,
      }
    });
  } catch(error) {
    if (error?.response.status === 403) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/student-login');
    };

    if (error.response.status === 401) {
      dispatch({
        type: UNAUTHENTICATED,
      });
      navigate('/');
    };

    dispatch({
      type: EXAM_TAKE_CODE_FAIL,
      payload: {
        buttonLoading: false,
        message: error.response.data.message || 'Unexpected Error',
      }
    });

    navigate('/student');

    notification(true);
  }
}
