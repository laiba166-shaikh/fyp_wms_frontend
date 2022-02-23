import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Paper, Box, NativeSelect, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik } from "formik";
import FileDownload from 'js-file-download';
import moment from 'moment';
// import { Select } from "../../../../controls";
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllProductInward, exportInwards } from '../../../../redux/ProductInward/ProductInwardActions';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import SearchBar from '../../../../controls/SearchBar';
import Loader from '../../../../components/Loader';

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

const ProductInward = ({ getAllProductInward, getAllCompanies, getAllWarehouses, totalCount, productInwards, companies, warehouses, exportInwards, exportedInwards }) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const [company, setCompany] = useState("All");
    const [warehouse, setWarehouse] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [queryParams, setQueryParams] = useState({ companyId: "", warehouseId: "", search: "" })
    const [downloadFiledFlag, setDownloadFiledFlag] = useState(false)
    useEffect(() => {
        if (!!exportedInwards && downloadFiledFlag) {
            FileDownload(exportedInwards, `Inwards ${moment().format('DD-MM-yyyy')}.xlsx`);
        }
    }, [exportedInwards])

    useEffect(() => {
        getAllCompanies("", "")
        getAllWarehouses("", "")
    }, [])

    useEffect(() => {
        if(company != 'All'){
            setQueryParams({ ...queryParams, companyId: company })
        }
    }, [company])

    useEffect(() => {
        if(company != 'All'){
        setQueryParams({ ...queryParams, warehouseId: warehouse })
        }
    }, [warehouse])

    useEffect(() => {
        if (searchQuery) {
            setCompany("All")
            setWarehouse("All")
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

    const handleExportInwards = () => {
        exportInwards()
        setDownloadFiledFlag(true)
    }

    const viewProductInwardClick = (id) => {
        navigate(`/main/operations/product-inward/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: "company", label: "Company", align: "center", format: (value) => value.Company.name },
        { id: "warehouse", label: "Warehouse", align: "center", format: (value) => value.Warehouse.name },
        { id: 'vehicleType', label: 'Vehicle Type', align: "center" },
        { id: 'vehicleName', label: 'Vehicle Name', align: 'center' },
        { id: 'vehicleNumber', label: 'Vehicle Number', align: 'center' },
        { id: 'driverName', label: 'Driver Name', align: 'center' },
        { id: 'referenceId', label: 'Reference Id', align: 'center' },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Product Inward"
                        buttonTitle="Add Product Inward"
                        headerAction={() => navigate("/main/operations/product-inward/new")}
                        clickExportInwards={handleExportInwards}
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
                                    {
                                        companies ?
                                            [{
                                                name: "All",
                                                _id: "All"
                                            }, ...companies].map((company,idx) => (
                                                <option key={idx} value={company._id}>{company.name}</option>
                                            ))
                                            :
                                            ''
                                    }
                                </Select>
                                <FormHelperText style={{ color: "white" }}>Select Company</FormHelperText>
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
                                    {
                                        warehouses ?
                                            [{
                                                name: "All",
                                                _id: "All"
                                            }, ...warehouses].map((warehouse,idx) => (
                                                <option key={idx} value={warehouse._id}>{warehouse.name}</option>
                                            ))
                                            :
                                            ''
                                    }
                                </Select>
                                <FormHelperText style={{ color: "white" }}>Select Warehouses</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <SearchBar
                                    searchValue={searchQuery}
                                    clearSearch={clearSearchQuery}
                                    changeSearchValue={handleSearchQueryChange}
                                />
                                <FormHelperText style={{ color: "white" }}>Select Company</FormHelperText>
                            </FormControl>
                        </Box>
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={productInwards}
                        fetchData={getAllProductInward}
                        params={queryParams}
                        navigation={viewProductInwardClick}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions = {
    getAllProductInward,
    getAllCompanies,
    getAllWarehouses,
    exportInwards
}

const mapStateToProps = (state) => ({
    productInwards: state.productInwards.productInwards,
    totalCount: state.productInwards.totalCount,
    exportedInwards: state.productInwards.exportedInwards,
    companies: state.companies.companies,
    warehouses: state.warehouses.warehouses
})

export default connect(mapStateToProps, actions)(ProductInward);
