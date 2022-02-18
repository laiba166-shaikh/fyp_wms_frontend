import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getCities, getOwareProductOutwards } from '../../../../utility/functions';
import { getAllVehicle } from '../../../../redux/Vehicle/VehicleActions';
import { getAllDriver } from '../../../../redux/Driver/DriverActions';
import { createRide, getRide, updateRide } from "../../../../redux/Ride/RideActions";

const validationSchema = yup.object({
    companyId: yup.string().required("Company must be provided"),
    vehicleId: yup.string().required("Vehicle must be provided"),
    driverId: yup.string().required("Driver must be provided"),
    outwardId: yup.string(),
    status: yup
        .string()
        .min(3, 'Status should be more than equal to 3 characters'),
    pickupCityId: yup
        .string()
        .required("Pickup City is required"),
    pickupCityAddress: yup
        .string()
        .min(3, 'Pickup Address should be more than equal to 3 characters')
        .required("Pickup Address is required"),
    dropoffCityId: yup
        .string()
        .required("Pickup City is required"),
    dropoffCityAddress: yup
        .string()
        .min(3, 'Pickup Address should be more than equal to 3 characters')
        .required("Pickup Address is required"),
    price: yup.string().required("Customer Price is required"),
    cost: yup.string().required("Vendor Cost is required"),
    cargoWeight: yup.string().required("Cargo Weight is required")
});

const initialValues = {
    companyId: "",
    vehicleId: "",
    driverId: "",
    pickupCityId: "",
    pickupCityAddress: "",
    dropoffCityId: "",
    dropoffCityAddress: "",
    price: "",
    outwardId: "",
    cost: "",
    cargoWeight: ""
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
}))

const AddRide = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const readOnly = String(location.pathname).includes("readOnly")

    const [loading, setLoading] = useState(true)
    const [cities, setCities] = useState([])
    const [outwards, setOutwards] = useState([])
    const [singleRide, setSingleRide] = useState({})

    const { companies, vehicles, drivers } = useSelector((state) => ({
        companies: state.companies.companies,
        vehicles: state.vehicles.vehicles,
        drivers: state.drivers.drivers,
    }))

    useEffect(() => {
        setLoading(true)
        dispatch(getAllCompanies("", ""))
        getCities("", "").then((res) => setCities([...res]))
        getOwareProductOutwards().then((outwards) => setOutwards([...outwards]))
        dispatch(getAllVehicle("", ""))
        dispatch(getAllDriver("", ""))
        Promise.all([companies, vehicles, drivers, cities]).then((values) => {
            console.log("all promise resolve ", values)
            // if (!params.id) {
            //     setLoading(false)
            // }
        }).finally(() => setLoading(false))

        //fetch ride when view / edit
        if (params.id) {
            setLoading(true)
            dispatch(getRide(params.id)).then((res) => {
                setSingleRide({ ...res })
            }).finally(() => setLoading(false))
        }
    }, [dispatch])

    const handleSubmit = (values) => {
        if (!params.id) {
            setLoading(true)
            dispatch(createRide(values)).then((res) => {
                setLoading(false)
            }).catch((err) => {
                console.log("error creating ride")
                setLoading(false)
            }).finally(() => navigate("/main/logistics/ride"))
        } else {
            const { Company, User, Vehicle, DropoffCity, PickupCity, ProductOutward, Driver, ...editValues } = values
            setLoading(true)
            dispatch(updateRide(editValues)).then((res) => {
                setLoading(false)
            }).catch((err) => {
                console.log("error updating ride")
                setLoading(false)
            }).finally(() => navigate("/main/logistics/ride"))
        }
    }

    return (
        <Grid item className={classes.root} md={12} xs={12}>
            {loading && <Loader />}
            <PageHeader
                title={`${params.id ? readOnly ? "View" : "Edit" : "Add"} Ride`}
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/logistics/ride")}
            />
            <Formik
                initialValues={singleRide?._id ? singleRide : initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ handleSubmit, errors, values, touched }) => (
                    <>
                        <Form>
                            <Typography variant="body1" style={{ margin: "4px 0px" }}>
                                Company & Vehicle
                            </Typography>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={12}>
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
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item md={6} sm={12}>
                                    <Select
                                        label={readOnly ? "Vehicle" : "Select Vehicle"}
                                        fullWidth={true}
                                        name="vehicleId"
                                        id="Vehicle"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {vehicles?.map((vehicle) => (
                                            <MenuItem key={vehicle._id} value={vehicle._id}>{vehicle.registrationNumber}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <Select
                                        label={readOnly ? "Driver" : "Select Driver"}
                                        fullWidth={true}
                                        name="driverId"
                                        id="driver"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {drivers?.map((driver) => (
                                            <MenuItem key={driver._id} value={driver._id} id={driver._id}>
                                                {driver.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" style={{ margin: "4px 0px" }}>
                                Pick up & Drop off
                            </Typography>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        label={readOnly ? "Pick-up City" : "Select Pickup City"}
                                        fullWidth={true}
                                        name="pickupCityId"
                                        id="pickupCity"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {cities?.map((city) => (
                                            <MenuItem key={city._id} value={city._id} id={city._id}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Pick up Address"
                                        name="pickupCityAddress"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="pickupAddress"
                                        placeholder="Pick up Address"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={4}>
                                    <Select
                                        label={readOnly ? "Drop-off City" : "Select Dropoff City"}
                                        fullWidth={true}
                                        name="dropoffCityId"
                                        id="dropoffCity"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {cities?.map((city) => (
                                            <MenuItem key={city._id} value={city._id} id={city._id}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextInput
                                        label="Drop off Address"
                                        name="dropoffCityAddress"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="dropOffAddress"
                                        placeholder="Drop off Address"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Select
                                        label="Outwards"
                                        fullWidth={true}
                                        name="outwardId"
                                        id="outward"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {outwards?.map((outward) => (
                                            <MenuItem key={outward._id} value={outward._id} id={outward._id}>
                                                {outward.internalIdForBusiness}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" style={{ margin: "4px 0px" }}>
                                Cost & Price
                            </Typography>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Customer price"
                                        name="price"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="customerPrice"
                                        placeholder="Customer Price (Rs)"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Vendor Cost"
                                        name="cost"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="vendorCost"
                                        placeholder="Vendor Cost (Rs)"
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant="body1" style={{ margin: "4px 0px" }}>
                                Other Details
                            </Typography>
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <TextInput
                                        label="Weight of Cargo"
                                        name="cargoWeight"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="cargoWeight"
                                        placeholder="Weight Of Cargo"
                                    />
                                </Grid>
                            </Grid>
                            {!readOnly && <Button variant="contained" color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit} style={{ width: "25%" }}>
                                {params.id ? "Update Ride" : "Add Ride"}
                            </Button>}
                        </Form>
                    </>
                )}

            </Formik>
        </Grid>
    );
};

export default AddRide
