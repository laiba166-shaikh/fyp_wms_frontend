import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem, } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers"
import { DeleteOutline } from "@material-ui/icons"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getCompanyWarehouses, createDispatchOrder, getDispatchOrder } from '../../../../redux/DispatchOrder/DispatchOrderActions';
import AddOrderProductForm from '../../../../components/AddOrderProductForm';
import client from "../../../../redux/client";

const validationSchema = yup.object({
    companyId: yup.string().required("Company must be provided"),
    warehouseId: yup.string().required("Warehouse must be provided"),
    receiverName: yup
        .string()
        .min(3, 'Receiver Name should be more than equal to 3 characters')
        .required("Receiver name is required"),
    shipmentDate: yup.string(),
    receiverPhone: yup
        .string()
        .min(3, 'Receiver Phone should be more than equal to 3 characters')
        .required("Receiver Phone is required"),
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
        '& .MuiOutlinedInput-root': {
            borderRadius: "5px",
            '& fieldset': {
                borderColor: 'rgba(255,255,255,0.5)',
            },
            '&:hover fieldset': {
                borderColor: '#d9d9d9',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#d9d9d9',
            },
        },
        "& .MuiInputBase-root": {
            color: "rgba(255,255,255,0.5)",
            width: "100%"
        },
        "& .MuiFormControl-root": {
            width: "100%"
        },
        "& .MuiFormLabel-root": {
            color: "rgba(255,255,255,0.5)"
        },
    },
    prodList: {
        margin: theme.spacing(2, 0),
        color: "rgba(255,255,255,0.5)",
        paddingRight: theme.spacing(10)
    },
    listItem: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
        margin: theme.spacing(1, 0)
    }
}))

const AddOrder = ({ getCompanyWarehouses, createDispatchOrder, getDispatchOrder }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(false)
    const [shipmentDate, setShipmentDate] = useState(new Date())
    const [companies, setCompanies] = useState([])
    const [companyWarehouses, setCompanyWarehouses] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const [singleDispatchOrder, setSingleDispatchOrder] = useState({})

    useEffect(() => {
        const fetchOrderRelation = async () => {
            const { data: { data } } = await client.get(`/dispatch-orders/relations/`)
            console.log("order relation", data)
            setCompanies([...data.companies])
        }
        fetchOrderRelation()
    }, [])

    //view
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            getDispatchOrder(params.id).then(({ products, ...res }) => {
                console.log("single", res)
                handleCompanyChange(res.companyId)
                setSingleDispatchOrder({ ...res })
                setOrderProducts([...products])
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [params])

    //add
    const handleCompanyChange = (companyId) => {
        getCompanyWarehouses(companyId).then((res) => {
            if (res?.length) setCompanyWarehouses([...res])
        })
    }

    const handleAddOrderProduct = (selectedProduct) => {
        if (orderProducts.some((prod) => prod.product._id === selectedProduct.product._id)) return
        setOrderProducts([...orderProducts, selectedProduct])
    }

    const handleFilterProducts = (id) => {
        const filteredproducts = orderProducts.filter((prod) => prod.product._id !== id)
        setOrderProducts([...filteredproducts])
    }

    const handleSubmit = (values) => {
        setLoading(true)
        createDispatchOrder(values).then((blockChainTransData) => {
            console.log("after order create -> ",blockChainTransData)            
            // callBlockchain(blockChainTransData);            
        }).catch((err) => {
            console.log("error creating prod inward")
            setLoading(false)
        })
    }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                title={`${(params.id && readOnly) ? "View" : "Add"} Order`}
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/dispatch-order")}
            />
            <Formik
                initialValues={singleDispatchOrder?._id ? singleDispatchOrder : initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    const submitProd = orderProducts.map((ordProd) => ({ id: ordProd.inventory._id, quantity: ordProd.quantity }))
                    values.inventories = submitProd
                    values.shipmentDate = shipmentDate.toString()
                    console.log("values - >", values)
                    handleSubmit(values)
                }}
            >
                {({ handleSubmit, errors, values, touched, setFieldValue }) => (
                    <>
                        <Form>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label="Select Company"
                                        fullWidth={true}
                                        name="companyId"
                                        onChange={(e) => {
                                            setFieldValue("companyId", e.target.value)
                                            handleCompanyChange(e.target.value)
                                        }}
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
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly || !values.companyId ? true : false}
                                    >
                                        {companyWarehouses?.map((warehouse, i) => (
                                            <MenuItem value={warehouse._id} key={i}>
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
                                        autoComplete="off"
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
                                        autoComplete="off"
                                        id="receiverPhone"
                                        placeholder="Receiver Phone(e.g 032*_*******)"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        format="dd/MM/yyyy"
                                        label="Shipment Date"
                                        views={["year", "date", "month"]}
                                        autoOk
                                        className={classes.datePicker}
                                        value={singleDispatchOrder._id ? singleDispatchOrder.shipmentDate : shipmentDate}
                                        onChange={setShipmentDate}
                                        name="shipmentDate"
                                        disablePast
                                        inputVariant="filled"
                                        variant='inline'
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Reference Id"
                                        name="referenceId"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="referenceId"
                                        autoComplete="off"
                                        placeholder="Reference Id"
                                    />
                                </Grid>
                                {!readOnly && <Grid item xs={12} md={12}>
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
                                </Grid>}
                            </Grid>
                            <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                Product Details
                            </Typography>
                            {!readOnly && <AddOrderProductForm addValues={handleAddOrderProduct} companyId={values.companyId} warehouseId={values.warehouseId} />}
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
                                        {!readOnly && <Box gridColumn="span 3">
                                            <div onClick={() => handleFilterProducts(orderProd.product._id)} style={{ cursor: "pointer" }}>
                                                <DeleteOutline />
                                            </div>
                                        </Box>}
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
    getCompanyWarehouses,
    createDispatchOrder,
    getDispatchOrder
}

export default connect(null, actions)(AddOrder);