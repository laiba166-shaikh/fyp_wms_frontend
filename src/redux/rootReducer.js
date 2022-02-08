import {combineReducers} from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";
import WarehouseReducer from "./Warehouse/WarehouseReducer";
import BrandReducer from "./Brand/BrandReducer";
import UomReducer from "./Uom/UomReducer";
import CategoryReducer from "./Category/CategoryReducer";
import ProductReducer from "./ProductUpload/ProductUploadReducer";
import ProductInwardReducer from "./ProductInward/ProductInwardReducer";

const rootReducer=combineReducers({
    auth:AuthReducer,
    users:UsersReducer,
    companies:CompanyReducer,
    warehouses:WarehouseReducer,
    brands:BrandReducer,
    uoms:UomReducer,
    categories:CategoryReducer,
    products:ProductReducer,
    productInwards:ProductInwardReducer
});

export default rootReducer;