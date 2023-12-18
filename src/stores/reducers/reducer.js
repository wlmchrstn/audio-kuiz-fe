import { combineReducers } from 'redux';
import ReducerAuth from './ReducerAuth';
import ReducerExam from './ReducerExam';
import ReducerQuestion from './ReducerQuestion';
import ReducerStudent from './ReducerStudent';
import ReducerExamResult from './ReducerExamResult';
import ReducerAnswer from './ReducerAnswer';

const rootReducer = combineReducers({
    ReducerAuth,
    ReducerExam,
    ReducerQuestion,
    ReducerStudent,
    ReducerExamResult,
    ReducerAnswer,
});

export default rootReducer;
