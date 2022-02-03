import {combineReducers} from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";
import WarehouseReducer from "./Warehouse/WarehouseReducer";

const rootReducer=combineReducers({
    auth:AuthReducer,
    users:UsersReducer,
    companies:CompanyReducer,
    warehouses:WarehouseReducer
});

export default rootReducer;