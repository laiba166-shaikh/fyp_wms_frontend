import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import VehicleEditDialog from './VehicleEditDialog';
import PageHeader from "../../../../components/PageHeader";
import { getAllVehicle } from '../../../../redux/Vehicle/VehicleActions';
import { connect } from 'react-redux';

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

const Vehicle = ({ vehicles, totalCount, getAllVehicle }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [vehicleEditOpen, setVehicleEditOpen] = useState(true)
    const [view, setView] = useState(false)
    const onVehicleEditClose = () => {
        setView(false)
        setVehicleEditOpen(false)
        navigate(`/main/logistics/vehicle`)
    }

    const handleViewOnly = (id) => {
        setView(true)
        vehicleUiEvents.editVehicleClick(id)
    }

    const vehicleUiEvents = {
        addNewVehicleClick: () => {
            navigate(`/main/logistics/vehicle/new`)
            setVehicleEditOpen(true)
        },
        editVehicleClick: (id) => {
            navigate(`/main/logistics/vehicle/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setVehicleEditOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'registrationNumber', label: 'Registration Number', align: "center" },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={vehicleUiEvents.editVehicleClick} onClickView={handleViewOnly} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Vehicle'
                        buttonTitle="Add New"
                        headerAction={() => vehicleUiEvents.addNewVehicleClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={vehicles}
                        fetchData={getAllVehicle}
                    />
                    <Routes>
                        <Route path="new" element={<VehicleEditDialog show={vehicleEditOpen} onClose={onVehicleEditClose} />} />
                        <Route path=":id/edit" element={<VehicleEditDialog show={vehicleEditOpen} onClose={onVehicleEditClose} view={view} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    vehicles: state.vehicles.vehicles,
    totalCount: state.vehicles.totalCount
})

const actions = {
    getAllVehicle
}

export default connect(mapStateToProps, actions)(Vehicle);
