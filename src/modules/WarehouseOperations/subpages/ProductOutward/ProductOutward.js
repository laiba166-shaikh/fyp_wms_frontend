import React from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllProductOutward } from '../../../../redux/ProductOutward/ProductOutwardActions';

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

const ProductOutward = ({ getAllProductOutward, productOutwards, totalCount }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const viewproductOutwardClick = (id) => {
        navigate(`/main/operations/product-outward/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { label: 'Order Id', id: 'DispatchOrder.name', align: "center", format: (order) => order.DispatchOrder[0].internalIdForBusiness},
        { id: 'quantity', label: 'Quantity', align: "center" },
        { id: 'externalVehicle', label: 'Vehicle', align: 'center', format: (value) => <div>{value.externalVehicle ? "Customer Provided" : "Oware Provided"}</div> },
        { id: 'referenceId', label: 'Reference Id', align: 'center' },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Product Outward"
                        buttonTitle="Add Product Outward"
                        headerAction={() => navigate("/main/operations/product-outward/new")}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={productOutwards}
                        fetchData={getAllProductOutward}
                        navigation={viewproductOutwardClick}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions = {
    getAllProductOutward
}

const mapStateToProps = (state) => ({
    productOutwards: state.productOutwards.productOutwards,
    totalCount: state.productOutwards.totalCount
})

export default connect(mapStateToProps, actions)(ProductOutward);