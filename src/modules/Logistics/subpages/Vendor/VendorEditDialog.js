import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddVendor from '../../modals/AddVendor';
import { getVendor, createVendor, updateVendor } from "../../../../redux/Vendor/VendorActions";

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
const VendorEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        notes: "",
        phone: "",
    }

    const [vendor, setVendor] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getVendor(params.id)).then((res) => {
                setVendor({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("vendor did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save vendor function if(id) { edit }else { create }  
    const saveVendor = (vendor) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateVendor(vendor)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating vendor")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createVendor(vendor)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating vendor")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    {params.id ? view ? "View" : "Edit" : "Add"} Vendor
                </Typography>
            </DialogTitle>
            <AddVendor
                initialValues={vendor || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveVendor}
                readOnly={view}
            />
        </Dialog>
    )
}

export default VendorEditDialog;
