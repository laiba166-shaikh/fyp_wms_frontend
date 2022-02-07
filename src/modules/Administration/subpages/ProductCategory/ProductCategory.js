import React, { useState } from 'react'
import { Typography, makeStyles, Grid, Paper, Box, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import ProductCategoryEditDialog from './ProductCategoryEditDialog';
import DeleteModal from '../../modals/DeleteModal';
import { getAllCategory } from '../../../../redux/Category/CategoryActions';
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

const ProductCategory = ({ categories, totalCount, getAllCategory }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [productCategoryEditOpen, setProductCategoryEditOpen] = useState(true)
    const [showProductCategoryDelete, setShowProductCategoryDelete] = useState(false)
    const onProductCategoryEditClose = () => {
        setProductCategoryEditOpen(false)
        navigate(`/main/admin/product-category`)
    }
    const handleProductCategoryDeleteClose = () => setShowProductCategoryDelete(false)
    const handleProductCategoryDeleteOpen = () => setShowProductCategoryDelete(true)

    const ProductCategoryUiEvents = {
        addNewProductCategoryClick: () => {
            navigate(`/main/admin/product-category/new`)
            setProductCategoryEditOpen(true)
        },
        editProductCategoryClick: (id) => {
            navigate(`/main/admin/product-category/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setProductCategoryEditOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "center" },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={ProductCategoryUiEvents.editProductCategoryClick} dontView={true} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Product Category
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => ProductCategoryUiEvents.addNewProductCategoryClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={categories}
                        fetchData={getAllCategory}
                    />
                    <Routes>
                        <Route path="new" element={<ProductCategoryEditDialog show={productCategoryEditOpen} onClose={onProductCategoryEditClose} />} />
                        <Route path=":id/edit" element={<ProductCategoryEditDialog show={productCategoryEditOpen} onClose={onProductCategoryEditClose} />} />
                    </Routes>
                    <DeleteModal
                        show={showProductCategoryDelete}
                        handleClose={handleProductCategoryDeleteClose}
                        entityName={"Product Category"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state) => ({
    categories: state.categories.category,
    totalCount: state.categories.totalCount
})

const actions = {
    getAllCategory
}

export default connect(mapStateToProps, actions)(ProductCategory);
