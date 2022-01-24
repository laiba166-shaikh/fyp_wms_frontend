import { Outlet, Route,Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../modules/Auth/Login";
import Users from "../modules/Administration/subpages/User/Users";
import Company from "../modules/Administration/subpages/Company/Company";
import Customers from "../modules/Administration/subpages/Customers/Customers";
import Warehouse from "../modules/Administration/subpages/Warehouse/Warehouse";
import Brands from "../modules/Administration/subpages/Brand/Brand";
import Uom from "../modules/Administration/subpages/Uom/Uom";
import ProductCategory from "../modules/Administration/subpages/ProductCategory/ProductCategory";
import ProductUpload from "../modules/Administration/subpages/ProductUpload/ProductUpload";

const AppRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="main">
                <Route path="admin" element={<MainLayout/>} >
                    <Route path="users/*" element={<Users/>} />
                    <Route path="company/*" element={<Company />} />
                    <Route path="customers/*" element={<Customers/>} />
                    <Route path="warehouse/*" element={<Warehouse/>} />
                    <Route path="brand/*" element={<Brands/>} />
                    <Route path="uom/*" element={<Uom/>} />
                    <Route path="product-category/*" element={<ProductCategory/>} />
                    <Route path="product-upload/*" element={<ProductUpload />} />
                    <Route path="activity-logs" element={<div>activity logs</div>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;