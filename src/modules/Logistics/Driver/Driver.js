import React, { useState } from 'react'
import { makeStyles, Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import PaginatedTable from '../../../components/PaginatedTable';
import { getAllDrivers } from '../../../redux/Driver/DriverActions';
import { ActionColumnFormatter } from '../../../utility/actionFormatters';
import DriverEditDialog from './DriverEditDialog';

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


function Driver({ drivers, totalCount, getAllDrivers }) {

    const classes = useStyles();
    const navigate = useNavigate()

    const [view, setView] = useState(false)
    const [driverEditOpen, setDriverEditOpen] = useState(true)
    const [showDriverDelete, setShowDriverDelete] = useState(false)

    const onDriverEditClose = () => {
        setDriverEditOpen(false)
        setView(false)
        navigate(`/main/logistics/driver`)
    }

    const handleViewOnly = (id) => {
        setView(true)
        DriverUiEvents.editDriverClick(id)
    }

    const DriverUiEvents = {
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
        { id: 'name', label: 'Diver Name', align: "center" },
        { id: 'Vendor.name', label: 'Vendor Name', align: "center", format: (entity) => entity.Vendor?.name },
        { id: 'isActive', label: 'Status', align: 'center', format: (entity) => entity.isActive ? "Active" : "in Active" },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={DriverUiEvents.editDriverClick} onClickView={handleViewOnly} /> },
    ];


    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Driver
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => DriverUiEvents.addNewDriverClick()}>
                            Add new
                        </Button>
                    </Box>

                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={drivers}
                        fetchData={getAllDrivers}
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
    getAllDrivers
}

export default connect(mapStateToProps, actions)(Driver)