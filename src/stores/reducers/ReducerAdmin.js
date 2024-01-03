import {
  ADMIN_GET,
} from '../actions/types';

const initialState = {
  loading: false,
  buttonLoading: false,
  message: '',
  messageStatus: '',
  adminList: [],
  admin: {
    username: '',
    status: '',
  },
};

const ReducerAdmin = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADMIN_GET:
      return {
        ...state,
        loading: payload.loading,
        buttonLoading: payload.buttonLoading,
        message: payload.message,
        messageStatus: payload.messageStatus,
        admin: payload.admin,
      }
    default:
      return state;
  };
};

export default ReducerTeacher;
