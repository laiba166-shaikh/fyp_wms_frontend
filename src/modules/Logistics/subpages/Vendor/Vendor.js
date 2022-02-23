import React, { useState } from 'react'
import { makeStyles, Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllVendors } from '../../../../redux/Vendor/VendorActions';
import VendorEditDialog from './VendorEditDialog';
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';

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

    const [view, setView] = useState(false)
    const [vendorEditOpen, setVendorEditOpen] = useState(true)
    // const [showVendorDelete, setShowVendorDelete] = useState(false)

    const onVendorEditClose = () => {
        setVendorEditOpen(false)
        setView(false)
        navigate(`/main/logistics/vendor`)
    }
    // const handleVendorDeleteClose = () => setShowVendorDelete(false)
    // const handleVendorDeleteOpen = () => setShowVendorDelete(true)
    const handleViewOnly = (id) => {
        setView(true)
        VendorUiEvents.editVendorClick(id)
    }

    const VendorUiEvents = {
        addNewVendorClick: () => {
            navigate(`/main/logistics/vendor/new`)
            setVendorEditOpen(true)
        },
        editVendorClick: (id) => {
            navigate(`/main/logistics/vendor/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setVendorEditOpen(true)
        }
    }


    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'name', label: 'Vendor', align: "center" },
        { id: 'phone', label: 'Phone', align: 'center' },
        { id: 'contactName', label: 'Contact Name', align: 'center', format: (entity) => `${entity.User.firstName} ${entity.User.lastName}` },
        { id: 'isActive', label: 'Status', align: 'center', format: (entity) => entity.isActive ? "Active" : "in Active" },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={VendorUiEvents.editVendorClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title='Vendor'
                        buttonTitle="Add New"
                        headerAction={() => VendorUiEvents.addNewVendorClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={vendors}
                        fetchData={getAllVendors}
                    />

                    <Routes>
                        <Route path="new" element={<VendorEditDialog show={vendorEditOpen} onClose={onVendorEditClose} />} />
                        <Route path=":id/edit" element={<VendorEditDialog show={vendorEditOpen} onClose={onVendorEditClose} view={view} />} />
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