import {HomeOutlined, ApartmentOutlined,DirectionsBus,DonutLargeOutlined} from '@material-ui/icons';

export const AdministrationLinks={
    label:"Administration",
    path:"/main/admin",
    icon: <HomeOutlined style={{color:"#fff",fontSize:18}}/>,
    sublinks:[
        {
            label:"Users",
            path:"/main/admin/users"
        },
        {
            label:"Company",
            path:"/main/admin/company"    
        },
        {
            label:"Customers",
            path: "/main/admin/customers" 
        },
        {
            label:"Warehouse",
            path: "/main/admin/warehouse"
        },
        {
            label:"Brand",
            path: "/main/admin/brand"
        },
        {
            label:"UOM",
            path:"/main/admin/uom"
        },
        {
            label:"Product Category",
            path:"/main/admin/product-category"
        },
        {
            label:"Product Upload",
            path:"/main/admin/product-upload"
        },
        {
            label:"Activity Logs",
            path:"/main/admin/activity-logs"
        },
    ]
}

export const WarehouseOptLinks={
    label:"Warehouse Operations",
    path:"#",
    icon:<ApartmentOutlined style={{color:"#fff",fontSize:18}}/>,
    sublinks:[
        {
            path:"#",
            label:"Product Inwards"
        },
        {
            path:"#",
            label:"Dispatch Order"
        },
        {
            path:"#",
            label:"Product Outward"
        },
        {
            path:"#",
            label:"Inventory Adjustment"
        }
    ]
};

export const LogisticsLinks={
    label:"Logistics",
    path:"#",
    icon:<DirectionsBus  style={{color:"#fff", fontSize:18}}/>,
    sublinks:[
        {
            path:"#",
            label:"Vendor"
        },
        {
            path:"#",
            label:"Driver"
        },
        {
            path:"#",
            label:"Vehicle"
        },
        {
            path:"#",
            label:"Ride"
        }
    ]
};

export const ReportingLinks={
    label:"Reporting",
    path:"#",
    icon:<DonutLargeOutlined style={{color:"#fff",fontSize:18}} />,
    sublinks:[
        {
            path:"#",
            label:"Inventory"
        },
        {
            path:"#",
            label:"Ride"
        },
    ]
}