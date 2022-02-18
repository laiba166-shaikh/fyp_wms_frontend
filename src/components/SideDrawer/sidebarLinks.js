import { HomeOutlined, ApartmentOutlined, DirectionsBus, DonutLargeOutlined } from '@material-ui/icons';

export const AdministrationLinks = {
    label: "Administration",
    path: "/main/admin",
    icon: <HomeOutlined style={{ color: "#fff", fontSize: 18 }} />,
    sublinks: [
        {
            label: "Users",
            path: "/main/admin/users"
        },
        {
            label: "Company",
            path: "/main/admin/company"
        },
        {
            label: "Warehouse",
            path: "/main/admin/warehouse"
        },
        {
            label: "Brand",
            path: "/main/admin/brand"
        },
        {
            label: "UOM",
            path: "/main/admin/uom"
        },
        {
            label: "Product Category",
            path: "/main/admin/product-category"
        },
        {
            label: "Product Upload",
            path: "/main/admin/product-upload"
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
            label: "Product Inwards"
        },
        {
            path: "/main/operations/dispatch-order",
            label: "Dispatch Order"
        },
        {
            path: "/main/operations/product-outward",
            label: "Product Outward"
        },
        {
            path: "/main/operations/stock-adjustment",
            label: "Stock Adjustment"
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
            label: "Vendor"
        },
        {
            path: "/main/logistics/driver",
            label: "Driver"
        },
        {
            path: "/main/logistics/vehicle-type",
            label: "Vehicle Types"
        },
        {
            path: "/main/logistics/vehicle",
            label: "Vehicle"
        },
        {
            path: "/main/logistics/ride",
            label: "Ride"
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
            path: "/main/reporting/inventory"
        },
    ]
}