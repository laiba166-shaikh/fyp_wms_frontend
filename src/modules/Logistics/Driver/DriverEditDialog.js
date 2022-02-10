import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddDriver from '../../Administration/modals/AddDriver';
import { getDriver, createDriver, updateDriver } from "../../../redux/Driver/DriverActions";

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
const DriverEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        license: "",
        vendor: "",
        phone: "",
        cnicNumber: "",
    }

    const [driver, setDriver] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getDriver(params.id)).then((res) => {
                setDriver({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("driver did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save driver function if(id) { edit }else { create }  
    const saveDriver = (driver) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateDriver(driver)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating driver")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createDriver(driver)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating driver")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    {params.id ? view ? "View" : "Edit" : "Add"} Driver
                </Typography>
            </DialogTitle>
            <AddDriver
                initialValues={driver || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveDriver}
                readOnly={view}
            />
        </Dialog>
    )
}

export default DriverEditDialog;
