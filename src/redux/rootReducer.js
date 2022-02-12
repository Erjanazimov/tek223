import {combineReducers} from "redux";
import {submitReducer} from "./submitReducer.js";
import {studentReducer} from "./studentsReducer";
import {NewsReducer} from "./NewsReducer";
import {accountsReducer} from "./accountsReducer";

export const rootReducer = combineReducers({
    submitReducer,
    NewsReducer,
    accountsReducer,
    studentReducer
})