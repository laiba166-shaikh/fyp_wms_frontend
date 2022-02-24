import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllDriver } from '../../../../redux/Driver/DriverActions';
import DriverEditDialog from './DriverEditDialog';
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
}))

const Driver = ({ drivers, totalCount, getAllDriver }) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const [view, setView] = useState(false)
    const [driverEditOpen, setDriverEditOpen] = useState(true)

    const onDriverEditClose = () => {
        setDriverEditOpen(false)
        setView(false)
        navigate(`/main/logistics/driver`)
    }

    const handleViewOnly = (id) => {
        setView(true)
        driverUiEvents.editDriverClick(id)
    }

    const driverUiEvents = {
        addNewDriverClick: () => {
            navigate(`/main/logistics/driver/new`)
            setDriverEditOpen(true)
        },
        editDriverClick: (id) => {
            navigate(`/main/logistics/driver/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setDriverEditOpen(true)
        }
    }

    const columns = [
        { id: 'name', label: 'Driver', align: "center" },
        { id: "licenseNumber", label: "License Number", align: 'center' },
        { id: "cnicNumber", label: "Cnic Number", align: 'center' },
        { id: 'phone', label: 'Phone', align: 'center' },
        { id: 'isActive', label: 'Status', align: 'center', format: (entity) => entity.isActive ? "Active" : "In-Active" },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={driverUiEvents.editDriverClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title='Driver'
                        buttonTitle="Add New"
                        headerAction={() => driverUiEvents.addNewDriverClick()}
                    />

                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={drivers}
                        fetchData={getAllDriver}
                    />

                    <Routes>
                        <Route path="new" element={<DriverEditDialog show={driverEditOpen} onClose={onDriverEditClose} />} />
                        <Route path=":id/edit" element={<DriverEditDialog show={driverEditOpen} onClose={onDriverEditClose} view={view} />} />
                    </Routes>

                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    drivers: state.drivers.drivers,
    totalCount: state.drivers.totalCount
})

const actions = {
    getAllDriver
}

export default connect(mapStateToProps, actions)(Driver)