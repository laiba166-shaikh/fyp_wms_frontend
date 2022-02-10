import React, { useState, useEffect } from 'react'
import { TextInput, Select } from '../../../controls';
import { MenuItem, DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Driver name should be greater than equal to 3 characters')
        .required('Driver Name is required'),
    license: yup
        .string()
        .min(3, 'Vendor type should be greater than equal to 3 characters')
        .required('License is required'),
    vendor: yup
        .string()
        .min(3, 'vendor should be gretaer than equal to 5 characters'),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    cnicNumber: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("CNIC is required"),
});


const AddDriver = ({ initialValues, onClose, id, loading, onSave, readOnly }) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) {
            setStatus(initialValues.isActive)
        }
    }, [initialValues])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    onSave(values)
                } else {
                    const formValues = { ...values, isActive: status }
                    onSave(formValues)
                }
            }}
        >
            {({ handleSubmit, errors, values, touched }) => (
                <>
                    {loading && <Loader />}
                    <DialogContent>
                        <Form>
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Driver Name"
                                        name="name"
                                        id="DriverName"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        fullWidth={true}
                                        // type="text"
                                        placeholder="Driver name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="License"
                                        name="licenseNumber"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        fullWidth={true}
                                        // type="text"
                                        id="license"
                                        placeholder="License"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Vendor"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        name="Vendor.name"
                                        // type="text"
                                        id="vendor"
                                        placeholder="Vendor"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        name="phone"
                                        // type="text"
                                        id="phone"
                                        placeholder="+92 1342 122"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="CNIC"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        name="cnicNumber"
                                        // type="text"
                                        id="cnic"
                                        placeholder="+92 1342 122"
                                    />
                                </Grid>
                                {
                                    (id && !readOnly) && <Grid item md={12} sm={12}>
                                        <FormControlLabel
                                            label="Active"
                                            style={{ color: "rgba(255,255,255,0.5)" }}
                                            control={
                                                <Checkbox
                                                    checked={status}
                                                    size="small"
                                                    color="secondary"
                                                    onChange={(ev) => {
                                                        setStatus(ev.target.checked)
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    readOnly && <Typography variant='body1' style={{ color: "rgba(255,255,255,0.5)", margin: "4px" }}>
                                        {status ? "Active" : "In Active"}
                                    </Typography>
                                }
                            </Grid>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                    </DialogActions>
                </>
            )}
        </Formik>
    )
}

export default AddDriver;
