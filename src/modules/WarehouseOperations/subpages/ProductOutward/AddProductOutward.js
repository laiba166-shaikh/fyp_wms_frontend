import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Paper, TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getDispatchOrder } from '../../../../redux/DispatchOrder/DispatchOrderActions';
import { createProductOutward, getProductOutward, getProductOutwardOrders } from '../../../../redux/ProductOutward/ProductOutwardActions';
import moment from 'moment';

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
    companyItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
        flexWrap: "wrap",
        margin: theme.spacing(1, 0),
        padding: theme.spacing(1)
    }
}))

const AddProductOutward = ({ getProductOutwardOrders, getDispatchOrder, createProductOutward, getProductOutward }) => {

    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [transportationType, setTransportationType] = useState("false")
    const [quantityError, setQuantityError] = useState({ id: "", errorMessage: "" })
    const [outwardProducts, setOutwardProducts] = useState([]) //dispatch order times
    const [toOutwardProducts, setToOutwardProducts] = useState([]) //product outwards times
    const [singleDispatchOrder, setSingleDispatchOrder] = useState({})
    const [singleProductOutward, setSingleProductOutward] = useState({})

    useEffect(() => {
        getProductOutwardOrders().then((res) => {
            setOrders([...res])
        }).catch((Err) => console.log("err in order get"))
    }, [])
    
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            getProductOutward(params.id).then(({ orderData, products }) => {
                console.log("getsingleout", orderData, products)
                setSingleProductOutward({ ...orderData, externalVehicle: orderData.externalVehicle ? "true" : "false" })
                // handleChangeOrder(res.dispatchOrderId)
                setOutwardProducts([...products])
                // setToOutwardProducts([...products])
                getDispatchOrder(orderData.dispatchOrderId).then(({ products, ...res }) => {
                    setSingleDispatchOrder({ ...res })
                    setLoading(false)
                })
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [params])

    const handleTransportChange = (e) => {
        setTransportationType(e.target.value)
    }

    //get order details when any order is selected
    const handleChangeOrder = (orderId) => {
        setLoading(true)
        getDispatchOrder(orderId).then(({ products, ...res }) => {
            console.log("single", res, products)
            setSingleDispatchOrder({ ...res })
            setOutwardProducts([...products])
            // setToOutwardProducts([...products])
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    const handleProductOutwardQuantityChange = (currQuantity, currProduct) => {
        const { product, inventory, quantity } = currProduct;
        console.log("current Product - >", currProduct)
        var ProductToOut = []
        if (currQuantity > quantity) {
            console.log("quantity can not greater than available quantity")
            setQuantityError({ id: currProduct.product._id, errorMessage: "quantity can not greater than available quantity" })
            return;
        }
        if (!currQuantity || currQuantity === 0) {
            ProductToOut = toOutwardProducts.filter((prod) => prod.product._id !== product._id)
            setToOutwardProducts([...ProductToOut])
            setQuantityError({ id: "", errorMessage: "" })
            return;
        }
        setQuantityError({ id: "", errorMessage: "" })
        var isPresent = toOutwardProducts?.some((existProd) => existProd?.product?._id === product._id);
        if (isPresent) {
            ProductToOut = toOutwardProducts.map((outProd) =>
                outProd.product._id === product._id
                    ? { ...outProd, quantity: currQuantity }
                    : { ...outProd }
            );
            setToOutwardProducts([...ProductToOut])
            return;
        } else {
            ProductToOut = [...toOutwardProducts, { ...currProduct, quantity: currQuantity }];
            // console.log("not present", returnedProducts)
            setToOutwardProducts([...ProductToOut])
        }
    }

   
    // 2nd blockchain
    const handleSubmit = (values) => {
        console.log("database out req->", values)
        setLoading(true)
        createProductOutward(values).then((res) => {
            setLoading(false)
            navigate("/main/operations/product-outward")
        }).catch((err) => {
            console.log("error creating prod inward")
            setLoading(false)
        })
    }
    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                title={`${(params.id && readOnly) ? "View" : "Add"} Product Outward`}
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/product-outward")}
            />
            <Formik
                initialValues={singleProductOutward?._id ? singleProductOutward : initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    var blockChainInventory = []
                    values.externalVehicle = transportationType === "false" ? false : true
                    if (toOutwardProducts.length >= 1) {
                        values.inventories = toOutwardProducts.map((ordProd) => ({ id: ordProd.inventory._id, quantity: ordProd.quantity }))
                        blockChainInventory = outwardProducts.map((outProd) => {
                            const findInOutward = toOutwardProducts.find((toOut) => toOut.inventory._id === outProd.inventory._id)
                            if (findInOutward) {
                                return { id: findInOutward.inventory._id, quantity: findInOutward.quantity }
                            } else {
                                return { id: outProd.inventory._id, quantity: 0 }
                            }
                        })
                    } else {
                        values.inventories = outwardProducts.map((ordProd) => ({ id: ordProd.inventory._id, quantity: ordProd.quantity }))
                        blockChainInventory = values.inventories
                    }
                    //block chain values
                    const blockChainVerifyData = {
                        dispatchOrderId: values.dispatchOrderId,
                        inventories: blockChainInventory
                    }
                    console.log("values - >", values, blockChainVerifyData)
                    // handleSubmit(values)
                    // const verifyValues={...blockChainVerifyData,inventories:[...values.inventories,{id: '365day17893gs58600x', quantity:2000}]}
                    callBlockchain(values, blockChainVerifyData)
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
                                            handleChangeOrder(e.target.value)
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
                            {singleDispatchOrder._id &&
                                <> <Grid conatiner xs={12}>
                                    <Grid item xs={12}>
                                        <Paper elevation={3} variant="elevation" className={classes.listItem} style={{ margin: "2rem 0" }}>
                                            <Box className={classes.companyItem}>
                                                <Typography variant="caption">Company</Typography>
                                                <Typography variant="body1">{singleDispatchOrder?.company.name}</Typography>
                                            </Box>
                                            <Box className={classes.companyItem}>
                                                <Typography variant='caption'>Warehouse</Typography>
                                                <Typography variant="body1">{singleDispatchOrder?.warehouse.name}</Typography>
                                            </Box>
                                            <Box className={classes.companyItem}>
                                                <Typography variant='caption'>No of Products</Typography>
                                                <Typography variant="body1">{outwardProducts?.length}</Typography>
                                            </Box>
                                            <Box className={classes.companyItem}>
                                                <Typography variant='caption'>Shipment Date</Typography>
                                                <Typography variant="body1">{moment(singleDispatchOrder?.shipmentDate).format("DD-MM-yyyy")}</Typography>
                                            </Box>
                                            <Box className={classes.companyItem}>
                                                <Typography variant='caption'>Receiver Name</Typography>
                                                <Typography variant="body1">{singleDispatchOrder?.receiverName}</Typography>
                                            </Box>
                                            <Box className={classes.companyItem}>
                                                <Typography variant='caption'>Receiver Phone</Typography>
                                                <Typography variant="body1">{singleDispatchOrder?.receiverPhone}</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                    <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                        Product Details
                                    </Typography>
                                    {outwardProducts?.map((orderProd) => (
                                        <Paper className={classes.prodList} elevation={3} variant="elevation" key={orderProd._id} style={{ width: readOnly ? "60%" : "100%" }}>
                                            <Box className={classes.listItem}>
                                                <Typography variant="body1">{orderProd.product.name}</Typography>
                                                <Typography variant="body1">
                                                    {orderProd.product.uomId.name}
                                                </Typography>
                                                {readOnly ?
                                                    <>
                                                        {/*Order and outward qty in view mode */}
                                                        <Typography variant="body1">
                                                            Order Qty: {orderProd.orderedQuantity}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            Outward Qty: {orderProd.outwardQuantity}
                                                        </Typography>
                                                    </> :
                                                    <>
                                                        { /*ordered quantity in add mode*/}
                                                        <Typography variant="body1">
                                                            Qty Order:  {orderProd.quantity}
                                                        </Typography>
                                                    </>
                                                }
                                                {!readOnly && <TextField
                                                    variant="filled"
                                                    size="small"
                                                    margin='none'
                                                    placeholder='0'
                                                    label="Quantity"
                                                    onChange={(e) => handleProductOutwardQuantityChange(parseInt(e.target.value), orderProd)}
                                                    inputProps={{ className: classes.label }}
                                                    style={{ marginRight: "5rem", color: "white" }}
                                                    error={Boolean(quantityError.id === orderProd.product._id)}
                                                    helperText={quantityError.id === orderProd.product._id ? quantityError.errorMessage : ""}
                                                />}
                                            </Box>
                                        </Paper>
                                    ))}
                                </>
                            }
                            {(!readOnly && singleDispatchOrder._id) && <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit}>
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
    createProductOutward,
    getProductOutwardOrders,
    getDispatchOrder,
    getProductOutward
}

export default connect(null, actions)(AddProductOutward);