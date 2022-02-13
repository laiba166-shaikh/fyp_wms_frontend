import React, { useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import VehicleTypeEditDialog from './VehicleTypeEditDialog';
import PageHeader from "../../../../components/PageHeader";
import { getAllVehicleType } from '../../../../redux/VehicleType/VehicleTypeActions';
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

const VehicleType = ({ vehicleTypes, totalCount, getAllVehicleType }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [vehicleTypeEditOpen, setVehicleTypeEditOpen] = useState(true)
    const onVehicleTypeEditClose = () => {
        setVehicleTypeEditOpen(false)
        navigate(`/main/logistics/vehicle-type`)
    }

    const vehicleTypeUiEvents = {
        addNewVehicleTypeClick: () => {
            navigate(`/main/logistics/vehicle-type/new`)
            setVehicleTypeEditOpen(true)
        },
        editVehicleTypeClick: (id) => {
            navigate(`/main/logistics/vehicle-type/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setVehicleTypeEditOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "center" },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={vehicleTypeUiEvents.editVehicleTypeClick} dontView={true} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Vehicle Type'
                        buttonTitle="Add New"
                        headerAction={() => vehicleTypeUiEvents.addNewVehicleTypeClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={vehicleTypes}
                        fetchData={getAllVehicleType}
                    />
                    <Routes>
                        <Route path="new" element={<VehicleTypeEditDialog show={vehicleTypeEditOpen} onClose={onVehicleTypeEditClose} />} />
                        <Route path=":id/edit" element={<VehicleTypeEditDialog show={vehicleTypeEditOpen} onClose={onVehicleTypeEditClose} />} />
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    vehicleTypes: state.vehicleTypes.vehicleTypes,
    totalCount: state.vehicleTypes.totalCount
})

const actions = {
    getAllVehicleType
}

export default connect(mapStateToProps, actions)(VehicleType);
