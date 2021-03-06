import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../modules/Auth/Login";
import Users from "../modules/Administration/subpages/User/Users";
import Company from "../modules/Administration/subpages/Company/Company";
import Warehouse from "../modules/Administration/subpages/Warehouse/Warehouse";
import Brands from "../modules/Administration/subpages/Brand/Brand";
import Uom from "../modules/Administration/subpages/Uom/Uom";
import ProductCategory from "../modules/Administration/subpages/ProductCategory/ProductCategory";
import ProductUpload from "../modules/Administration/subpages/ProductUpload/ProductUpload";
import ProductInward from "../modules/WarehouseOperations/subpages/ProductInward/ProductInward";
import AddProductInward from "../modules/WarehouseOperations/subpages/ProductInward/AddproductInward";
import DispatchOrder from "../modules/WarehouseOperations/subpages/DispatchOrder/DispatchOrder";
import AddOrder from "../modules/WarehouseOperations/subpages/DispatchOrder/AddOrder";
import ProductOutward from "../modules/WarehouseOperations/subpages/ProductOutward/ProductOutward";
import AddProductOutward from "../modules/WarehouseOperations/subpages/ProductOutward/AddProductOutward";
import Inventory from "../modules/Reporting/Inventory";
import Vendor from "../modules/Logistics/subpages/Vendor/Vendor";
import Driver from "../modules/Logistics/subpages/Driver/Driver";
import StockAdjustment from "../modules/WarehouseOperations/subpages/StockAdjustment/StockAdjustment";
import AddStockAdjustment from "../modules/WarehouseOperations/subpages/StockAdjustment/AddStockAdjustment";
import VehicleType from "../modules/Logistics/subpages/VehicleType/VehicleType";
import Vehicle from "../modules/Logistics/subpages/Vehicle/Vehicle";
import Ride from "../modules/Logistics/subpages/Ride/Ride";
import AddRide from "../modules/Logistics/subpages/Ride/AddRide";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="main">
                <Route path="admin" element={<MainLayout />} >
                    <Route path="users/*" element={<Users />} />
                    <Route path="company/*" element={<Company />} />
                    <Route path="warehouse/*" element={<Warehouse />} />
                    <Route path="brand/*" element={<Brands />} />
                    <Route path="uom/*" element={<Uom />} />
                    <Route path="product-category/*" element={<ProductCategory />} />
                    <Route path="product-upload/*" element={<ProductUpload />} />
                </Route>
                <Route path="operations" element={<MainLayout />}>
                    <Route path="product-inward" element={<ProductInward />} />
                    <Route path="product-inward/new" element={<AddProductInward />} />
                    <Route path="product-inward/:id/readOnly" element={<AddProductInward />} />
                    <Route path="dispatch-order" element={<DispatchOrder />} />
                    <Route path="dispatch-order/new" element={<AddOrder />} />
                    <Route path="dispatch-order/:id/readOnly" element={<AddOrder />} />
                    <Route path="product-outward" element={<ProductOutward />} />
                    <Route path="product-outward/new" element={<AddProductOutward />} />
                    <Route path="product-outward/:id/readOnly" element={<AddProductOutward />} />
                    <Route path="stock-adjustment" element={<StockAdjustment/>} />
                    <Route path="stock-adjustment/new" element={<AddStockAdjustment/>} />
                    <Route path="stock-adjustment/:id/readOnly" element={<AddStockAdjustment/>} />
                </Route>
                <Route path="reporting" element={<MainLayout />} >
                    <Route path="inventory" element={<Inventory />} />
                </Route>
                <Route path="logistics" element={<MainLayout />} >
                    <Route path="vendor/*" element={<Vendor />} />
                    <Route path="driver/*" element={<Driver/>} />
                    <Route path="vehicle-type/*" element={<VehicleType/>} />
                    <Route path="vehicle/*" element={<Vehicle/>} />
                    <Route path="ride" element={<Ride/>} />
                    <Route path="ride/new" element={<AddRide />} />
                    <Route path="ride/:id/edit" element={<AddRide />} />
                    <Route path="ride/:id/readOnly" element={<AddRide />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;