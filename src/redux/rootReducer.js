import {combineReducers} from "redux"
import AuthReducer from "./Auth/AuthReducer";
import UsersReducer from "./User/UserReducer";

const rootReducer=combineReducers({
    auth:AuthReducer,
    users:UsersReducer
});

export default rootReducer;