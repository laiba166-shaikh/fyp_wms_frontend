import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem } from '@material-ui/core';
import { DeleteOutline } from "@material-ui/icons"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import AddProductInwardForm from '../../../../components/AddProductInwardForm';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import { createProductInward, getProductInward } from '../../../../redux/ProductInward/ProductInwardActions';

const validationSchema = yup.object({
    companyId: yup.string().required("Company must be provided"),
    warehouseId: yup.string().required("Warehouse must be provided"),
    vehicleType: yup
        .string()
        .min(3, 'Vehicle Type should be more than equal to 3 characters'),
    vehicleName: yup
        .string()
        .min(3, 'Vehicle Name should be more than equal to 3 characters'),
    vehicleNumber: yup
        .string()
        .min(3, 'Vehicle Number should be more than equal to 3 characters'),
    driverName: yup
        .string()
        .min(3, 'Driver Name should be more than equal to 3 characters'),
    referenceId: yup.string().min(3, "Reference Id should be more than 3 characters"),
    products: yup.array().required()
});

const initialValues = {
    companyId: "",
    warehouseId: "",
    vehicleType: "",
    vehicleName: "",
    vehicleNumber: "",
    driverName: "",
    referenceId: "",
    products: []
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

const AddproductInward = ({ companies, warehouses, products, getAllCompanies, getAllWarehouses, createProductInward, getProductInward }) => {

    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(false)
    const [inwardProducts, setInwardProducts] = useState([])
    const [singleProductInward, setSingleProductInward] = useState({})

    useEffect(() => {
        getAllCompanies("", "")
        getAllWarehouses("", "")
    }, [])

    useEffect(() => {
        if (params.id) {
            setLoading(true)
            getProductInward(params.id).then((res) => {
                setSingleProductInward({ ...res })
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [params])

    const handleAddInwardsProduct = (selectedProduct) => {
        if (inwardProducts.some((prod) => prod.product._id === selectedProduct.product._id)) return
        setInwardProducts([...inwardProducts, selectedProduct])
    }

    const handleFilterProducts = (id) => {
        const filteredproducts = inwardProducts.filter((prod) => prod.product._id !== id)
        setInwardProducts([...filteredproducts])
    }

    const handleSubmit = (values) => {
        setLoading(true)
        createProductInward(values).then((res) => {
            setLoading(false)
        }).catch((err) => {
            console.log("error creating prod inward")
            setLoading(false)
        })
        navigate("/main/operations/product-inward")
    }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                title={`${params.id ? readOnly ? "View" : "Edit" : "Add"} Product Inward`}
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/product-inward")}
            />
            <Formik
                initialValues={singleProductInward?._id ? singleProductInward : initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    const submitProd = inwardProducts.map((inProd) => ({ id: inProd.product._id, quantity: inProd.quantity }))
                    values.products = submitProd
                    console.log("values - >", values)
                    handleSubmit(values)
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
                                        label="Vehicle Type"
                                        name="vehicleType"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="vehicleType"
                                        placeholder="Vehicle Type"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Vehicle Name"
                                        name="vehicleName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="vehicleName"
                                        placeholder="Vehicle Name"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={4}>
                                    <TextInput
                                        label="Vehicle Number"
                                        name="vehicleNumber"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="vehicleNumber"
                                        placeholder="Vehicle Number"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextInput
                                        label="Driver Name"
                                        name="driverName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="driverName"
                                        placeholder="Driver Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextInput
                                        label="Reference Id"
                                        name="referenceId"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="referenceId"
                                        placeholder="Reference Id"
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                Product Details
                            </Typography>
                            {!readOnly && <AddProductInwardForm addValues={handleAddInwardsProduct} />}
                            {inwardProducts.map((inwardProd) => (
                                <Box key={inwardProd.product._id} className={classes.prodList}>
                                    <Box display="grid" gridTemplateColumns="repeat(12,1fr)" className={classes.listItem}>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">{inwardProd.product.name}</Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {inwardProd.quantity}
                                            </Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {inwardProd.uom.name}
                                            </Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <div onClick={() => handleFilterProducts(inwardProd.product._id)} style={{ cursor: "pointer" }}>
                                                <DeleteOutline />
                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            {!readOnly && <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                               {params.id && !readOnly ? "Edit Product Inward" : "Add Product Inward"}
                            </Button>}
                        </Form>
                    </>
                )}

            </Formik>
        </Grid>
    );
};

const actions = {
    getAllCompanies,
    getAllWarehouses,
    createProductInward,
    getProductInward
}

const mapStateToProps = (state) => ({
    companies: state.companies.companies,
    warehouses: state.warehouses.warehouses,
})

export default connect(mapStateToProps, actions)(AddproductInward);
