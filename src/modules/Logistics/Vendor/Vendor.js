import React, { useState } from 'react'
import { makeStyles, Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import PaginatedTable from '../../../components/PaginatedTable';
import { getAllVendors } from '../../../redux/Vendor/VendorActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
    },
    container: {
        backgroundColor: "transparent",
        height: "100%",
        color: "#fff",
        padding: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

function Vendor({ vendors, totalCount, getAllVendors }) {

    const classes = useStyles();
    const navigate = useNavigate()

    const [vendorEditOpen, setVendorEditOpen] = useState(true)
    const [showVendorDelete, setShowVendorDelete] = useState(false)

    const onVendorEditClose = () => {
        setVendorEditOpen(false)
        navigate(`/main/admin/Vendor`)
    }
    const handleVendorDeleteClose = () => setShowVendorDelete(false)
    const handleVendorDeleteOpen = () => setShowVendorDelete(true)

    const VendorUiEvents = {
        addNewVendorClick: () => {
            navigate(`/main/logistics/Vendor/new`)
            setVendorEditOpen(true)
        },
        editVendorClick: (id) => {
            navigate(`/main/logistics/Vendor/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setVendorEditOpen(true)
        }
    }


    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'name', label: 'Vendor', align: "center" },
        { id: 'phone', label: 'Phone', align: 'center' },
        { id: 'contactName', label: 'Contact Name', align: 'center', format: (entity) => `${entity.User.firstName} ${entity.User.lastName}` },
        { id: 'isActive', label: 'Status', align: 'center', format: (entity) => entity.isActive ? "Active" : "InActive" },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Vendor
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => VendorUiEvents.addNewVendorClick()}>
                            Add new
                        </Button>
                    </Box>

                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={vendors}
                        fetchData={getAllVendors}
                    />

                    <Routes>
                        {/* <Route path="new" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} /> */}
                        {/* <Route path=":id/edit" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} /> */}
                    </Routes>

                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    vendors: state.vendors.vendors,
    totalCount: state.vendors.totalCount
})

const actions = {
    getAllVendors
}

export default connect(mapStateToProps, actions)(Vendor)