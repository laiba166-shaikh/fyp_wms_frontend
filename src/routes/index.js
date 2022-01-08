import { Outlet, Route,Routes } from "react-router";

const Auth=()=>{
    return <div>
        <h1>Auth Page</h1>
    </div>
};

const MainLayout=()=>{
    return <div>
        <h1>MainLayout</h1>
        <Outlet/>
    </div>
};

const Users=()=>{
    return <div>
        <h1>Users</h1>
    </div>
}

const AppRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="admin" element={<MainLayout/>} >
                <Route path="users" element={<Users/>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;