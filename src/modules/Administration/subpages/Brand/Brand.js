import React, { useState } from 'react'
import { Typography, makeStyles, Grid, Paper, Box, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import BrandEditDialog from './BrandEditDialog';
import DeleteModal from '../../modals/DeleteModal';
import { getAllBrands } from '../../../../redux/Brand/BrandActions';
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
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const Brands = ({ brands, totalCount, getAllBrands }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [brandEditOpen, setBrandEditOpen] = useState(true)
    const [showBrandDelete, setShowBrandDelete] = useState(false)
    const onBrandEditClose = () => {
        setBrandEditOpen(false)
        navigate(`/main/admin/brand`)
    }
    const handleBrandDeleteClose = () => setShowBrandDelete(false)
    const handleBrandDeleteOpen = () => setShowBrandDelete(true)

    const BrandUiEvents = {
        addNewBrandClick: () => {
            navigate(`/main/admin/brand/new`)
            setBrandEditOpen(true)
        },
        editBrandClick: (id) => {
            navigate(`/main/admin/brand/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setBrandEditOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "center" },
        { id: 'manufacturerName', label: 'Manufacturer', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={BrandUiEvents.editBrandClick} dontView={true} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Brand
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => BrandUiEvents.addNewBrandClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={brands}
                        fetchData={getAllBrands}
                    />
                    <Routes>
                        <Route path="new" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} />
                        <Route path=":id/edit" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} />
                    </Routes>
                    <DeleteModal
                        show={showBrandDelete}
                        handleClose={handleBrandDeleteClose}
                        entityName={"Brand"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    brands: state.brands.brands,
    totalCount: state.brands.totalCount
})

const actions = {
    getAllBrands
}

export default connect(mapStateToProps, actions)(Brands);
