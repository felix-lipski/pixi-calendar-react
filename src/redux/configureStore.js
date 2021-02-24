import { applyMiddleware, combineReducers, createStore } from "redux";
import calendarReducer from "./calendarReducer";

const reducer = combineReducers({
  calendar: calendarReducer
});

const store = createStore(reducer, applyMiddleware());

export default store;