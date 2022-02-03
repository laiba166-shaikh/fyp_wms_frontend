import {combineReducers} from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";

const rootReducer=combineReducers({
    auth:AuthReducer,
    users:UsersReducer,
    companies:CompanyReducer
});

export default rootReducer;