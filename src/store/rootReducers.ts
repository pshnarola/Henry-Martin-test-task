import { combineReducers } from "redux"
import contacts from "./contacts/reducer";

const appReducer = combineReducers({
    contacts,
})

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export default rootReducer
