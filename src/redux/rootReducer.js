import {combineReducers} from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";
import WarehouseReducer from "./Warehouse/WarehouseReducer";
import BrandReducer from "./Brand/BrandReducer";
import UomReducer from "./Uom/UomReducer";

const rootReducer=combineReducers({
    auth:AuthReducer,
    users:UsersReducer,
    companies:CompanyReducer,
    warehouses:WarehouseReducer,
    brands:BrandReducer,
    uoms:UomReducer
});

export default rootReducer;