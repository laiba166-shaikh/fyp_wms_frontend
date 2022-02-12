import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Button, MenuItem, Box } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { DeleteOutline } from "@material-ui/icons"
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getCompanyWarehouses } from '../../../../redux/DispatchOrder/DispatchOrderActions';
import AddOrderProductForm from '../../../../components/AddOrderProductForm';
import { createStockAdjust,getStockAdjustment } from '../../../../redux/StockAdjustment/StockAdjustmentActions';

const validationSchema = yup.object({
    companyId: yup.string().required("Company must be provided"),
    warehouseId: yup.string().required("Warehouse must be provided"),
    comment: yup.string().required()
});

const initialValues = {
    companyId: "",
    warehouseId: "",
    comment: ""
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

const AddOrder = ({ companies, getAllCompanies, getCompanyWarehouses, userId, createStockAdjust, getStockAdjustment }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(false)
    const [companyWarehouses, setCompanyWarehouses] = useState([])
    const [stockProducts, setStockProducts] = useState([])
    const [singleProductAdjustment,setSingleProductAdjustment] = useState({})

    useEffect(() => {
        getAllCompanies("", "")
    }, [])

    //view
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            getStockAdjustment(params.id).then(({product,...res}) => {
                console.log("single",product)
                setStockProducts([...product])
                handleCompanyChange(res.companyId)
                setSingleProductAdjustment({ ...res })
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [params])

    useEffect(()=>{
        console.log("stockProduct",stockProducts)
    },[stockProducts])

    const handleCompanyChange = (companyId) => {
        getCompanyWarehouses(companyId).then((res) => {
            if (res?.length) setCompanyWarehouses([...res])
        })
    }

    const handleAddStockProduct = (selectedProduct) => {
        if (stockProducts.some((prod) => prod.product._id === selectedProduct.product._id)) return
        setStockProducts([...stockProducts, selectedProduct])
    }

    const handleFilterStockProducts = (id) => {
        const filteredproducts = stockProducts.filter((prod) => prod.product._id !== id)
        setStockProducts([...filteredproducts])
    }

    const handleSubmit = (values) => {
        const inventories = stockProducts.map((inventory) => ({
            adminId: userId,
            inventoryId: inventory.inventory._id,
            comment: values.comment,
            adjustmentQuantity: inventory.quantity
        }))
        setLoading(true)
        createStockAdjust(inventories).then((res) => {
            setLoading(false)
            navigate("/main/operations/stock-adjustment")
        }).catch((err) => {
            console.log("error adjusting stock")
            setLoading(false)
        })
    }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                title={`${(params.id && readOnly) ? "View" : "Add"} Stock Adjustment`}
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/stock-adjustment")}
            />
            <Formik
                initialValues={singleProductAdjustment?.id ? singleProductAdjustment :initialValues}
                // initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    console.log("values - >", values)
                    console.log(stockProducts)
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
                                <Grid item xs={12} md={12}>
                                    <TextInput
                                        label="Comment"
                                        name="comment"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        autoComplete="off"
                                        multiline={true}
                                        rows={3}
                                        placeholder="Add Comment"
                                    />
                                </Grid>
                            </Grid>
                            {!readOnly && <AddOrderProductForm addValues={handleAddStockProduct} companyId={values.companyId} warehouseId={values.warehouseId}/>}
                            <Typography variant="h4" style={{ margin: "8px 0px" }}>
                                Product Details
                            </Typography>
                            {stockProducts.map((stockProd) => (
                                <Box key={stockProd.product._id} className={classes.prodList}>
                                    <Box display="grid" gridTemplateColumns="repeat(12,1fr)" className={classes.listItem}>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">{stockProd.product.name}</Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {stockProd.quantity}
                                            </Typography>
                                        </Box>
                                        <Box gridColumn="span 3">
                                            <Typography variant="body1">
                                                {stockProd.product.uomId.name}
                                            </Typography>
                                        </Box>
                                        {!readOnly && <Box gridColumn="span 3">
                                            <div onClick={() => handleFilterStockProducts(stockProd.product._id)} style={{ cursor: "pointer" }}>
                                                <DeleteOutline />
                                            </div>
                                        </Box>}
                                    </Box>
                                </Box>
                            ))}
                            {!readOnly && <Button variant="contained" color="secondary" style={{ marginTop: 20, width: "25%" }} onClick={handleSubmit}>
                                Apply Adjustments
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
    getCompanyWarehouses,
    createStockAdjust,
    getStockAdjustment
}

const mapStateToProps = (state) => ({
    companies: state.companies.companies,
    userId: state.auth.userData.id
})

export default connect(mapStateToProps, actions)(AddOrder);