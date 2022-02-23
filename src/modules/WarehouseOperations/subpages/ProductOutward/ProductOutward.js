import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Paper, Box, FormControl, InputLabel, Select } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import SearchBar from '../../../../controls/SearchBar';
import { getAllProductOutward } from '../../../../redux/ProductOutward/ProductOutwardActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
        "& .MuiFormLabel-root": {
            color: "#fff"
        },
        "& .MuiInputBase-root": {
            color: "black",
            backgroundColor: "#fff",
            borderRadius: "6px",
            border: "none",
        }
    },
    container: {
        backgroundColor: "transparent",
        height: "100%",
        color: "#fff",
        padding: theme.spacing(2)
    },
    filterBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(2, 1)
    },
    selectCont: {
        margin: theme.spacing(0, 1)
    }
}))

const ProductOutward = ({ getAllProductOutward, productOutwards, totalCount, getAllCompanies, getAllWarehouses, companies, warehouses }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const [company, setCompany] = useState("");
    const [warehouse, setWarehouse] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [queryParams, setQueryParams] = useState({ companyId: "", warehouseId: "", search: "" })

    useEffect(() => {
        getAllCompanies("", "")
        getAllWarehouses("", "")
    }, [])

    useEffect(() => {
        setQueryParams({ ...queryParams, companyId: company })
    }, [company])

    useEffect(() => {
        setQueryParams({ ...queryParams, warehouseId: warehouse })
    }, [warehouse])

    useEffect(() => {
        if (searchQuery) {
            setCompany("")
            setWarehouse("")
            setQueryParams({ ...queryParams, companyId: "", warehouseId: "", search: searchQuery })
        }
    }, [searchQuery])

    const handleSearchQueryChange = (searchValue) => {
        setSearchQuery(searchValue)
    }
    const clearSearchQuery = () => {
        setSearchQuery("")
        setQueryParams({ ...queryParams, search: "" })
    }

    const viewproductOutwardClick = (id) => {
        navigate(`/main/operations/product-outward/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { label: 'Order Id', id: 'DispatchOrder.name', align: "center", format: (order) => order.DispatchOrder[0].internalIdForBusiness },
        { id: 'quantity', label: 'Quantity', align: "center" },
        { id: 'externalVehicle', label: 'Vehicle', align: 'center', format: (value) => <div>{value.externalVehicle ? "Customer Provided" : "Oware Provided"}</div> },
        { id: 'referenceId', label: 'Reference Id', align: 'center' },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Product Outward"
                        buttonTitle="Add Product Outward"
                        headerAction={() => navigate("/main/operations/product-outward/new")}
                    />
                    <Box className={classes.filterBox}>
                        <Box sx={{ minWidth: 120 }} className={classes.selectCont}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="comp-simple-select-label"
                                    id="company-simple-select"
                                    name="companyId"
                                    placeholder='Select Company'
                                    value={company}
                                    label="Company"
                                    onChange={(e) => setCompany(e.target.value)}
                                >
                                    <option key="000" value="">{null}</option>
                                    {
                                        companies?.map((company) => (
                                            <option key={company._id} value={company._id}>{company.name}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }} className={classes.selectCont}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="ware-simple-select-label"
                                    id="warehouse-simple-select"
                                    placeholder='Select Warehouse'
                                    value={warehouse}
                                    label="Warehouse"
                                    onChange={(e) => setWarehouse(e.target.value)}
                                >
                                    <option key="111" value="">{null}</option>
                                    {
                                        warehouses?.map((warehouse) => (
                                            <option key={warehouse._id} value={warehouse._id}>{warehouse.name}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <SearchBar
                            searchValue={searchQuery}
                            clearSearch={clearSearchQuery}
                            changeSearchValue={handleSearchQueryChange}
                        />
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={productOutwards}
                        fetchData={getAllProductOutward}
                        navigation={viewproductOutwardClick}
                        params={queryParams}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions = {
    getAllProductOutward,
    getAllCompanies,
    getAllWarehouses
}

const mapStateToProps = (state) => ({
    productOutwards: state.productOutwards.productOutwards,
    totalCount: state.productOutwards.totalCount,
    companies: state.companies.companies,
    warehouses: state.warehouses.warehouses
})

export default connect(mapStateToProps, actions)(ProductOutward);