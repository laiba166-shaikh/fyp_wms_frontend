import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, Paper, FormControl, Select, Box, FormHelperText } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import FileDownload from 'js-file-download';
import moment from 'moment';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import SearchBar from '../../../../controls/SearchBar';
import { getAllOrders, exportOrders } from '../../../../redux/DispatchOrder/DispatchOrderActions';

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

const DispatchOrder = ({ getAllOrders, dispatchOrders, totalCount, exportedOrders, exportOrders }) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const [status, setStatus] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [queryParams, setQueryParams] = useState({ status: "", search: "" })
    const [downloadFiledFlag, setDownloadFiledFlag] = useState(false)
    useEffect(() => {
        if (!!exportedOrders && downloadFiledFlag) {
            FileDownload(exportedOrders, `Orders ${moment().format('DD-MM-yyyy')}.xlsx`);
        }
    }, [exportedOrders])

    useEffect(() => {
        if (status != 'All') {
            setQueryParams({ ...queryParams, status: status })
        } else {
            setQueryParams({ ...queryParams, status: "" })
        }
    }, [status])

    useEffect(() => {
        console.log("query ->", queryParams)
    }, [queryParams])

    useEffect(() => {
        if (searchQuery) {
            setStatus("All")
            setQueryParams({ ...queryParams, status: "", search: searchQuery })
        }
    }, [searchQuery])

    const handleSearchQueryChange = (searchValue) => {
        setSearchQuery(searchValue)
    }
    const clearSearchQuery = () => {
        setSearchQuery("")
        setQueryParams({ ...queryParams, search: "" })
    }

    const handleExportOrders = () => {
        exportOrders()
        setDownloadFiledFlag(true)
    }

    const viewDispatchOrderClick = (id) => {
        navigate(`/main/operations/dispatch-order/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'receiverName', label: 'Receiver Name', align: "center" },
        { id: 'receiverPhone', label: 'Receiver Phone', align: 'center' },
        { id: 'quantity', label: "Quantity", align: "center" },
        { id: "status", label: "Status", align: "center", format: (value) => value.status === 1 ? `${value.status} PENDING` : `${value.status} COMPLETED` },
        { id: 'referenceId', label: 'Reference Id', align: 'center' },
        { id: 'shipmentDate', label: 'Shipment Date', align: 'center' },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Dispatch Order"
                        buttonTitle="Add Order"
                        headerAction={() => navigate("/main/operations/dispatch-order/new")}
                        clickExportInwards={handleExportOrders}
                    />
                    <Box className={classes.filterBox}>
                        <Box sx={{ minWidth: 120 }} className={classes.selectCont}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="status-simple-select-label"
                                    id="status-simple-select"
                                    name="status"
                                    placeholder='Select Status'
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option key="All" value="All">ALL</option>
                                    <option key="001" value={1}>PENDING</option>
                                    <option key="002" value={2}>DISPATCHED</option>
                                </Select>
                                <FormHelperText style={{ color: "white" }}>Select Status</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <SearchBar
                                    searchValue={searchQuery}
                                    clearSearch={clearSearchQuery}
                                    changeSearchValue={handleSearchQueryChange}
                                />
                                <FormHelperText style={{ color: "white" }}>Select through ID</FormHelperText>
                            </FormControl>
                        </Box>

                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={dispatchOrders}
                        fetchData={getAllOrders}
                        params={queryParams}
                        navigation={viewDispatchOrderClick}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions = {
    getAllOrders,
    exportOrders
}

const mapStateToProps = (state) => ({
    dispatchOrders: state.dispatchOrders.dispatchOrders,
    totalCount: state.dispatchOrders.totalCount,
    exportedOrders: state.dispatchOrders.exportedOrders
})

export default connect(mapStateToProps, actions)(DispatchOrder);