import { combineReducers } from "redux";
import ReducerAuth from './ReducerAuth';
import ReducerExam from "./ReducerExam";
import ReducerQuestion from './ReducerQuestion';
import ReducerStudent from "./ReducerStudent";

const rootReducer = combineReducers({
    ReducerAuth,
    ReducerExam,
    ReducerQuestion,
    ReducerStudent,
});

export default rootReducer;
