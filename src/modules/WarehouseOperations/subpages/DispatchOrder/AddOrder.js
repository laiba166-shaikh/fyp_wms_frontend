import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem, } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers"
import { DeleteOutline } from "@material-ui/icons"
import { Formik, Form, } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import AddOrderProductForm from '../../../../components/AddOrderProductForm';

const validationSchema = yup.object({
    companyId: yup.string().required("Company must be provided"),
    warehouseId: yup.string().required("Warehouse must be provided"),
    receiverName: yup
        .string()
        .min(3, 'Receiver Name should be more than equal to 3 characters'),
    receiverPhone: yup
        .string()
        .min(3, 'Receiver Phone should be more than equal to 3 characters'),
    shipmentDate: yup
        .string()
        .min(3, 'Shipment Date should be more than equal to 3 characters'),
    referenceId: yup.string().min(3, "Reference Id should be more than 3 characters"),
    orderMemo: yup.string().max(500, "Order memo should not be greater than 500 characters"),
    inventories: yup.array().required()
});

const initialValues = {
    companyId: "",
    warehouseId: "",
    receiverName: "",
    receiverPhone: "",
    shipmentDate: "",
    referenceId: "",
    orderMemo: "",
    inventories: []
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
        color: "#fff",
        padding: theme.spacing(2, 4),
    },
    prodList: {
        margin: theme.spacing(2, 0),
        color: "rgba(255,255,255,0.5)",
        paddingRight: theme.spacing(10)
    },
    listItem: {
        padding: theme.spacing(1)
    }
}))

const AddOrder = ({ companies, warehouses, getAllCompanies, getAllWarehouses, }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(false)
    const [orderProducts, setOrderProducts] = useState([])
    // const [singleProductInward, setSingleProductInward] = useState({})

    useEffect(() => {
        getAllCompanies("", "")
        getAllWarehouses("", "")
    }, [])

    const handleAddOrderProduct = (selectedProduct) => {
        console.log("selectedProd", selectedProduct);
        if (orderProducts.some((prod) => prod.product._id === selectedProduct.product._id)) return
        setOrderProducts([...orderProducts, selectedProduct])
    }

    const handleFilterProducts = (id) => {
        const filteredproducts = orderProducts.filter((prod) => prod.product._id !== id)
        setOrderProducts([...filteredproducts])
    }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader/>}
            <PageHeader
                // title={`${params.id ? readOnly ? "View" : "Edit" : "Add"} Product Inward`}
                title="Add Order"
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/dispatch-order")}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    const submitProd = orderProducts.map((ordProd) => ({ id: ordProd.product._id, quantity: ordProd.quantity }))
                    values.inventories = submitProd
                    console.log("values - >", values)
                    // handleSubmit(values)
                }}
            >
                {({ handleSubmit, errors, values, touched }) => (
                    <>
                        <Form>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label="Select Company"
                                        fullWidth={true}
                                        name="companyId"
                                        id="companyId"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                    >
                                        {companies?.map((company) => (
                                            <MenuItem value={company._id} key={company._id}>
                                                {company.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label="Select Warehouse"
                                        fullWidth={true}
                                        name="warehouseId"
                                        id="warehouseId"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                    >
                                        {warehouses?.map((warehouse) => (
                                            <MenuItem value={warehouse._id} key={warehouse._id}>
                                                {warehouse.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Receiver Name"
                                        name="receiverName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="receiverName"
                                        placeholder="Receiver Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Receiver Phone"
                                        name="receiverPhone"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="receiverPhone"
                                        placeholder="Receiver Phone(e.g 032*_*******)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    {/* <DatePicker
                                        format="dd/MM/yyyy"
                                        label="Shipment Date"
                                        views={["year", "month", "date"]}
                                        renderInput={(params) => <TextInput {...params} />}
                                        name="shipmentDate"
                                        disablePast
                                        inputVariant="filled"
                                        variant='inline'
                                        disabled={readOnly ? true : false}
                                        id="shipmentDate"
                                        fullWidth={true}
                                    /> */}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Reference Id"
                                        name="referenceId"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="referenceId"
                                        placeholder="Reference Id"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextInput
                                        label="Order Memo"
                                        name="orderMemo"
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        fullWidth={true}
                                        multiline={true}
                                        rows={5}
                                        id="memo"
                                        placeholder="Order Memo (Optional)"
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                Product Details
                            </Typography>
                            {!readOnly && <AddOrderProductForm addValues={handleAddOrderProduct} />}
                            {orderProducts.map((orderProd) => (
                                <Box key={orderProd.product._id} className={classes.prodList}>
                                    <Box display="grid" gridTemplateColumns="repeat(12,1fr)" className={classes.listItem}>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">{orderProd.product.name}</Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {orderProd.quantity}
                                            </Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {orderProd.product.uomId.name}
                                            </Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <div onClick={() => handleFilterProducts(orderProd.product._id)} style={{ cursor: "pointer" }}>
                                                <DeleteOutline />
                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            {!readOnly && <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                Add Order
                            </Button>}
                        </Form>
                    </>
                )}

            </Formik>
        </Grid>
    )
};

const actions = {
    getAllCompanies,
    getAllWarehouses,
    // createProductInward,
    // getProductInward
}

const mapStateToProps = (state) => ({
    companies: state.companies.companies,
    warehouses: state.warehouses.warehouses,
})

export default connect(mapStateToProps, actions)(AddOrder);