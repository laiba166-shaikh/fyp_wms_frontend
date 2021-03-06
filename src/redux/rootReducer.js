import { combineReducers } from "redux"
import AuthReducer from "./Auth/AuthReducer";
import CompanyReducer from "./Company/CompanyReducer";
import UsersReducer from "./User/UserReducer";
import WarehouseReducer from "./Warehouse/WarehouseReducer";
import BrandReducer from "./Brand/BrandReducer";
import UomReducer from "./Uom/UomReducer";
import CategoryReducer from "./Category/CategoryReducer";
import ProductReducer from "./ProductUpload/ProductUploadReducer";
import ProductInwardReducer from "./ProductInward/ProductInwardReducer";
import DispatchOrderReducer from "./DispatchOrder/DispatchOrderReducer";
import InventoryReducer from "./Inventory/InventoryReducer";
import ProductOutwardReducer from "./ProductOutward/ProductOutwardReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import VendorReducer from "./Vendor/VendorReducer";
import DriverReducer from "./Driver/DriverReducer";
import StockAdjustmentReducer from "./StockAdjustment/StockAdjustmentReducer";
import VehicleTypeReducer from "./VehicleType/VehicleTypeReducer";
import VehicleReducer from "./Vehicle/VehicleReducer";
import RideReducer from "./Ride/RideReducer";

const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth'] // which reducer want to store
};

const rootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    companies: CompanyReducer,
    warehouses: WarehouseReducer,
    brands: BrandReducer,
    uoms: UomReducer,
    categories: CategoryReducer,
    products: ProductReducer,
    productInwards: ProductInwardReducer,
    dispatchOrders: DispatchOrderReducer,
    productOutwards: ProductOutwardReducer,
    stockAdjustments:StockAdjustmentReducer,
    inventories: InventoryReducer,
    vendors: VendorReducer,
    drivers:DriverReducer,
    vehicleTypes:VehicleTypeReducer,
    vehicles:VehicleReducer,
    rides:RideReducer
});

const pReducer = persistReducer(persistConfig, rootReducer)
export default pReducer;