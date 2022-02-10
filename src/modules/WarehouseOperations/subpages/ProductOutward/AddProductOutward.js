import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Paper, TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
// import AddProductInwardForm from '../../../../components/AddProductInwardForm';
// import { createProductInward, getProductInward } from '../../../../redux/ProductInward/ProductInwardActions';
import { getAllOrders } from '../../../../redux/DispatchOrder/DispatchOrderActions';

const validationSchema = yup.object({
    dispatchOrderId: yup.string().required("Dispatch order is required"),
    referenceId: yup.string().min(3, "Reference Id should be more than 3 characters"),
    externalVehicle: yup.boolean().required("transaportation type is required"),
    inventories: yup.array().required()
});

const initialValues = {
    dispatchOrderId: "",
    referenceId: "",
    externalVehicle: false,
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
        "& .MuiFormLabel-root.Mui-focused": {
            color: "rgba(255,255,255,0.7)"
        },
        "& .MuiFormLabel-root": {
            color: "rgba(255,255,255,0.5)"
        },
    },
    label: {
        color: "rgba(255,255,255,0.5)"
    },
    prodList: {
        backgroundColor: theme.palette.primary.light,
    },
    listItem: {
        backgroundColor: theme.palette.primary.light,
        color: "rgba(255,255,255,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: theme.spacing(1, 0),
        padding: theme.spacing(1)
    }
}))

const AddProductOutward = ({ getAllOrders, orders }) => {

    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(false)
    const [transportationType,setTransportationType]=useState("false")
    const [quantity,setQuantity]=useState(0)
    const [outwardProducts, setOutwardProducts] = useState([])
    const [singleProductOutward, setSingleProductOutward] = useState({})

    useEffect(() => {
        getAllOrders("", "")
    }, [])

    // useEffect(() => {
    //     if (params.id) {
    //         setLoading(true)
    //         getProductInward(params.id).then((res) => {
    //             setSingleProductInward({ ...res })
    //             setLoading(false)
    //         }).catch((err) => {
    //             setLoading(false)
    //         })
    //     }
    // }, [params])
    
    const handleTransportChange=(e)=>{
        setTransportationType(e.target.value)
    }

    const handleProductOutwardQuantityChange=()=>{
        //get quantity and product id
        //update QUANTIty 
    }
    // const handleSubmit = (values) => {
    //     setLoading(true)
    //     createProductInward(values).then((res) => {
    //         setLoading(false)
    //     }).catch((err) => {
    //         console.log("error creating prod inward")
    //         setLoading(false)
    //     })
    //     navigate("/main/operations/product-inward")
    // }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                // title={`${(params.id && readOnly) ? "View" : "Add"} Product Inward`}
                title="Add Product Outward"
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/product-outward")}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    values.externalVehicle=transportationType==="false" ? false : true
                    console.log("values - >", values)
                    // handleSubmit(values)
                }}
            >
                {({ handleSubmit, errors, values, touched, setFieldValue }) => (
                    <>
                        <Form>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label="Select Dispatch Order"
                                        fullWidth={true}
                                        name="dispatchOrderId"
                                        onChange={(e) => {
                                            setFieldValue("dispatchOrderId", e.target.value)
                                            // handleCompanyChange(e.target.value)
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                    >
                                        {orders?.map((order) => (
                                            <MenuItem value={order._id} key={order._id}>
                                                {order.internalIdForBusiness}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Reference Id"
                                        name="referenceId"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        fullWidth={true}
                                        id="referenceId"
                                        autoComplete="off"
                                        placeholder="Reference Id"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6} style={{ margin: "12px 0px" }}>
                                    <FormControl>
                                        <FormLabel component="label" className={classes.label}>Transportation Type</FormLabel>
                                        <RadioGroup name="externalVehicle" row onChange={handleTransportChange} value={transportationType}>
                                            <FormControlLabel value="false" control={<Radio color="secondary" />} label="Oware Provided" />
                                            <FormControlLabel value="true" control={<Radio color="secondary" />} label="Customer Provided" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid conatiner xs={12}>
                                <Grid item xs={12}>
                                    <Paper elevation={3} variant="elevation" className={classes.listItem} style={{ margin: "2rem 0" }}>
                                        <Typography variant="body1">Pepsi-Cola INternational Limited</Typography>
                                        <Typography variant="body1">SUNDAR 2-LHR/LHRPCI002</Typography>
                                        <Typography variant="body1">1</Typography>
                                        <Typography variant="body1">02/07/2022</Typography>
                                        <Typography variant="body1">Nawaz brothers lahore 150-987678</Typography>
                                        <Typography variant="body1">3333</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                Product Details
                            </Typography>
                            {/* {orderProducts.map((orderProd) => ( */}
                            <Paper className={classes.prodList} elevation={3} variant="elevation">
                                <Box className={classes.listItem}>
                                    <Typography variant="body1">Lays 40 gm 30*23</Typography>
                                    <Typography variant="body1">
                                        {/* {orderProd.product.uomId.name} */}
                                        Carton
                                    </Typography>
                                    <Typography variant="body1">
                                        {/* {orderProd.quantity} */}
                                        20
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        size="small"
                                        margin='none'
                                        placeholder='0'
                                        label="Quantity"
                                        inputProps={{ className: classes.label }}
                                        style={{ marginRight: "5rem", color: "white" }}
                                    />
                                </Box>
                            </Paper>
                            {/* ))} */}
                            {!readOnly && <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                Add Product Outward
                            </Button>}
                        </Form>
                    </>
                )}
            </Formik>
        </Grid>
    );
};

const actions = {
    // createProductInward,
    getAllOrders
}

const mapStateToProps = (state) => ({
    orders: state.dispatchOrders.dispatchOrders,
})

export default connect(mapStateToProps, actions)(AddProductOutward);