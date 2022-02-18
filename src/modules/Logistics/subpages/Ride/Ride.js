import React from 'react'
import { makeStyles, Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import { getAllRides } from "../../../../redux/Ride/RideActions";

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

const Ride = ({ rides, totalCount, getAllRides }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const viewRideClick = (id) => {
        navigate(`/main/logistics/ride/${id}/readOnly`)
    }

    const editRideClick = (id) => {
        navigate(`/main/logistics/ride/${id}/edit`)
    }

    const columns = [
        { id: 'company', label: 'Company', align: "center", format: (ride) => ride.Company.name },
        { id: 'driver', label: 'Driver', align: "center", format: (ride) => ride.Driver.name },
        { id: 'pickUpCity', label: "Pick Up City", align: "center", format: (ride) => ride.PickupCity.name },
        { id: 'dropOffCity', label: 'Drop Off City', align: 'center', format: (ride) => ride.DropoffCity.name },
        { id: "cargoWeight", label: "Cargo Weight", align: "center" },
        { id: 'createdBy', label: 'Created By', align: 'center', format: (ride) => `${ride.User.firstName} ${ride.User.lastName}` },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={editRideClick} onClickView={viewRideClick} /> }, 
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Ride"
                        buttonTitle="Create Ride"
                        headerAction={() => navigate("/main/logistics/ride/new")}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={rides}
                        fetchData={getAllRides}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    rides: state.rides.rides,
    totalCount: state.rides.totalCount
})

const actions = {
    getAllRides
}

export default connect(mapStateToProps, actions)(Ride)