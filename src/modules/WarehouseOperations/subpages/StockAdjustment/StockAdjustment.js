import React, {useState} from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect} from 'react-redux';
import moment from 'moment';
import PageHeader from '../../../../components/PageHeader';
import PaginatedTable from '../../../../components/PaginatedTable';
import DeleteModal from '../../../Administration/modals/DeleteModal';
import {getAllStockAdjustment,deleteStockAdjust} from "../../../../redux/StockAdjustment/StockAdjustmentActions"
import { DeleteFormatter } from '../../../../utility/actionFormatters';

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

const StockAdjustment = ({stockAdjustments,getAllStockAdjustment,totalCount,deleteStockAdjust}) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const [showDelete,setShowDelete]=useState(false)
    const [recordId,setRecordId]=useState("")

    const viewStockAdjustClick = (id) => {
        navigate(`/main/operations/stock-adjustment/${id}/readOnly`)
    }

    const handleDeleteOpen=(id)=>{
        setRecordId(id)
        setShowDelete(true)
    }

    const handleDeleteClose=()=>setShowDelete(false)

    const columns = [
        { id: '_id', label: 'Adjustment Id', align: "center" },
        { id: 'createdAt', label: 'Adjustment Date', align: "center", format:(value)=>moment(value.createdAt).format("DD-MM-yyyy") },
        { id: 'comment', label: 'Comment', align: 'center' },
        { id: 'adminId', label: 'Created By', align: 'center', format: (stock)=> stock.User.firstName },
        { id: "action", label: "Action", align: "center", format: (value) => <DeleteFormatter value={value} onDelete={handleDeleteOpen} onView={viewStockAdjustClick}/> },
    ]; 

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Stock Adjustment"
                        buttonTitle="Add Stock Adjustment"
                        headerAction={() => navigate("/main/operations/stock-adjustment/new")}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={stockAdjustments}
                        fetchData={getAllStockAdjustment}
                    />
                    <DeleteModal
                        show={showDelete}
                        handleClose={handleDeleteClose}
                        entityName={"Stock Adjustment"}
                        deleteAction={()=>deleteStockAdjust(recordId)}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
};

const actions={
    getAllStockAdjustment,
    deleteStockAdjust
}

const mapStateToProps=(state)=>({
    stockAdjustments : state.stockAdjustments.stockAdjustments,
    totalCount: state.stockAdjustments.totalCount
})

export default connect(mapStateToProps,actions)(StockAdjustment);