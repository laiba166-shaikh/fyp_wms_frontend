import React from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect} from 'react-redux';
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import { getAllProductInward } from '../../../../redux/ProductInward/ProductInwardActions';

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

const DispatchOrder = ({}) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const editDispatchOrderClick = (id) => {
        navigate(`/main/operations/dispatch-order/${id}`) //id is the specific record id from api send when click on edit btn
    }

    const viewDispatchOrderClick = (id) => {
        navigate(`/main/operations/dispatch-order/${id}/readOnly`)
    }

    const columns = [
        { id: 'internalIdForBusiness', label: 'Id', align: "center" },
        { id: 'vehicleType', label: 'Vehicle Type', align: "center" },
        { id: 'vehicleName', label: 'Vehicle Name', align: 'center' },
        { id: 'vehicleNumber', label: 'Vehicle Number', align: 'center' },
        { id: 'driverName', label: 'Driver Name', align: 'center' },
        { id: 'referenceId', label: 'Reference Id', align: 'center' },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={editDispatchOrderClick} onClickView={viewDispatchOrderClick} /> },
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
                    {/* <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={productInwards}
                        fetchData={getAllProductInward}
                    /> */}
                </Paper>
            </Grid>
        </Grid>
    )
};

// const actions={
//     getAllProductInward
// }

// const mapStateToProps=(state)=>({
//     productInwards : state.productInwards.productInwards,
//     totalCount: state.productInwards.totalCount
// })

// export default connect(mapStateToProps,actions)(ProductInward);

export default DispatchOrder
