import React, { useEffect, useState } from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import PaginatedTable from '../../components/PaginatedTable';
import { getAllInventories, exportInventories } from '../../redux/Inventory/InventoryActions';
import FileDownload from 'js-file-download';
import moment from 'moment';

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

function Inventory({ getAllInventories, totalCount, inventories, exportInventories, exportedInventories }) {

    const classes = useStyles();
    const navigate = useNavigate();
    const [downloadFiledFlag, setDownloadFiledFlag] = useState(false)
    useEffect(() => {
        if (!!exportedInventories && downloadFiledFlag) {
            FileDownload(exportedInventories, `Inventory ${moment().format('DD-MM-yyyy')}.xlsx`);
        }
    }, [exportedInventories])


    const viewProductInwardClick = (id) => {
        navigate(`/main/reporting/inventory`)
    }
    const columns = [
        { label: 'Product Name', id: 'Product.name', align: "center", format: (inventory) => inventory.Product.name },
        { label: 'Company', id: 'company', align: "center", format: (inventory) => inventory.Company.name },
        { label: 'Warehouse', id: 'warehouse', align: 'center', format: (inventory) => inventory.Warehouse.name },
        { label: 'UOM', id: 'uom', align: 'center', format: (inventory) => inventory.Product.uomId.name },
        { label: 'Available Quantity', id: 'availableQuantity', align: 'center' },
        { label: 'Commited Quantity', id: 'totalCommittedQuantity', align: 'center' },
        { label: 'Dispatched Quantity', id: 'totalDispatchedQuantity', align: 'center' },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={1} className={classes.container}>
                    <PageHeader
                        title="Inventory"
                        buttonTitle="Export"
                        headerAction={() => {
                            exportInventories()
                            setDownloadFiledFlag(true)
                        }}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={inventories}
                        fetchData={getAllInventories}
                        navigation={viewProductInwardClick}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const actions = {
    getAllInventories,
    exportInventories
}

const mapStateToProps = (state) => {
    return {
        inventories: state.inventories.inventories,
        totalCount: state.inventories.totalCount,
        exportedInventories: state.inventories.exportedInventories
    }
}

export default connect(mapStateToProps, actions)(Inventory);