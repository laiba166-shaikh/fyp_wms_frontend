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
                    <Route path="product-inward" element={<ProductInward />}/>
                    <Route path="product-inward/new" element={<AddProductInward />} />
                    <Route path="product-inward/:id" element={<AddProductInward />} />
                    <Route path="product-inward/:id/readOnly" element={<AddProductInward />} />
                    <Route path="dispatch-order" element={<div>Dispatch Order</div>} />
                    <Route path="product-outward" element={<div>Product Outward</div>} />
                    <Route path="inventory" element={<div>Inventory</div>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;