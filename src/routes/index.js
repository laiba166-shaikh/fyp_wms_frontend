import { Outlet, Route,Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../modules/Auth/Login";
import Users from "../modules/Administration/subpages/User/Users";
import Company from "../modules/Administration/subpages/Company/Company";

const AppRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="main">
                <Route path="admin" element={<MainLayout/>} >
                    <Route path="users/*" element={<Users/>} />
                    <Route path="company/*" element={<Company />} />
                    <Route path="customers/*" element={<div>customers</div>} />
                    <Route path="warehouse" element={<div>warehouse</div>} />
                    <Route path="brand" element={<div>brand</div>} />
                    <Route path="units-of-measurement" element={<div>uom</div>} />
                    <Route path="product-category" element={<div>product category</div>} />
                    <Route path="product-upload" element={<div>product upload</div>} />
                    <Route path="activity-logs" element={<div>activity logs</div>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;