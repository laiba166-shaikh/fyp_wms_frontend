import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddVehicle from '../../modals/AddVehicle';
import { getVehicle, createVehicle, updateVehicle } from "../../../../redux/Vehicle/VehicleActions";
import { getAllVendors } from '../../../../redux/Vendor/VendorActions';
import { getAllDriver } from '../../../../redux/Driver/DriverActions';
import { getAllVehicleType } from '../../../../redux/VehicleType/VehicleTypeActions';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(255,255,255,0.5)"
    }
}))
const VehicleEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        registrationNumber: "",
        vendorId: "",
        driverId: "",
        vehicleTypeId: ""
    }

    const [vehicle, setVehicle] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    const { vehicleTypes, vendors, drivers } = useSelector((state) => ({
        vehicleTypes: state.vehicleTypes.vehicleTypes,
        drivers: state.drivers.drivers,
        vendors: state.vendors.vendors
    }))
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        setLoading(true)
        dispatch(getAllDriver("", ""))
        dispatch(getAllVendors("", ""))
        dispatch(getAllVehicleType("", ""))
        Promise.all([vehicleTypes, vendors, drivers]).then((values) => {
            console.log("all promise resolve ", values)
            if (!params.id) {
                setLoading(false)
            }
        })
        if (params.id) {
            setLoading(true)
            dispatch(getVehicle(params.id)).then((res) => {
                setVehicle({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("vehicle s did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save Employee function if(id) { edit }else { create }  
    const saveVehicle = (vehicle) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateVehicle(vehicle)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating Vehicle")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createVehicle(vehicle)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating Vehicle")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                {params.id ? view ? "View" : "Edit" : "Add"} Vehicle
                </Typography>
            </DialogTitle>
            <AddVehicle
                initialValues={(params.id && vehicle._id) ? vehicle : initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveVehicle}
                vehicleTypes={vehicleTypes}
                vendors={vendors}
                drivers={drivers}
            />
        </Dialog>
    )
}

export default VehicleEditDialog;
