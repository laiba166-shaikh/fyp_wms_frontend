import React from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllOrders } from '../../../../redux/DispatchOrder/DispatchOrderActions';

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

const DispatchOrder = ({ getAllOrders, dispatchOrders, totalCount }) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const viewDispatchOrderClick = (id) => {
        navigate(`/main/operations/dispatch-order/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'receiverName', label: 'Receiver Name', align: "center" },
        { id: 'receiverPhone', label: 'Receiver Phone', align: 'center' },
        { id: 'quantity', label: "Quantity", align: "center" },
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
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={dispatchOrders}
                        fetchData={getAllOrders}
                        navigation={viewDispatchOrderClick}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions = {
    getAllOrders
}

const mapStateToProps = (state) => ({
    dispatchOrders: state.dispatchOrders.dispatchOrders,
    totalCount: state.dispatchOrders.totalCount
})

export default connect(mapStateToProps, actions)(DispatchOrder);