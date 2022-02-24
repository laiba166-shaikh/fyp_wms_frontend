import { HomeOutlined, ApartmentOutlined, DirectionsBus, DonutLargeOutlined } from '@material-ui/icons';

export const AdministrationLinks = {
    label: "Administration",
    path: "/main/admin",
    icon: <HomeOutlined style={{ color: "#fff", fontSize: 18 }} />,
    sublinks: [
        {
            label: "Users",
            path: "/main/admin/users",
            allowed: ["SUPER_ADMIN"]
        },
        {
            label: "Company",
            path: "/main/admin/company",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Warehouse",
            path: "/main/admin/warehouse",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Brand",
            path: "/main/admin/brand",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "UOM",
            path: "/main/admin/uom",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Product Category",
            path: "/main/admin/product-category",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            label: "Product Upload",
            path: "/main/admin/product-upload",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
    ]
}

export const WarehouseOptLinks = {
    label: "Warehouse Operations",
    path: "/main/operations",
    icon: <ApartmentOutlined style={{ color: "#fff", fontSize: 18 }} />,
    sublinks: [
        {
            path: "/main/operations/product-inward",
            label: "Product Inwards",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/operations/dispatch-order",
            label: "Dispatch Order",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/operations/product-outward",
            label: "Product Outward",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/operations/stock-adjustment",
            label: "Stock Adjustment",
            allowed: ["SUPER_ADMIN","ADMIN"]
        }
    ]
};

export const LogisticsLinks = {
    label: "Logistics",
    path: "/main",
    icon: <DirectionsBus style={{ color: "#fff", fontSize: 18 }} />,
    sublinks: [
        {
            path: "/main/logistics/vendor",
            label: "Vendor",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/logistics/driver",
            label: "Driver",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/logistics/vehicle-type",
            label: "Vehicle Types",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/logistics/vehicle",
            label: "Vehicle",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
        {
            path: "/main/logistics/ride",
            label: "Ride",
            allowed: ["SUPER_ADMIN","ADMIN"]
        }
    ]
};

export const ReportingLinks = {
    label: "Reporting",
    path: "/main/admin",
    icon: <DonutLargeOutlined style={{ color: "#fff", fontSize: 18 }} />,
    sublinks: [
        {
            label: "Inventory",
            path: "/main/reporting/inventory",
            allowed: ["SUPER_ADMIN","ADMIN"]
        },
    ]
}