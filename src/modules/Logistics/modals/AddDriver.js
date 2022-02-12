import React, { useEffect, useState } from 'react'
import { MenuItem, DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { TextInput, Select } from '../../../controls';
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Driver name should be greater than equal to 3 characters')
        .required('Driver Name is required'),
    licenseNumber: yup
        .string()
        .min(12, 'License Number should be equal to 12 characters')
        .required('License Number is required'),
    cnicNumber: yup
        .number()
        .min(13, 'Cnic Number should be equal to 13 characters'),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    vendorId: yup.string().required("Vendor is Required")
});

const AddDriver = ({ initialValues, onClose, id, onSave, loading, readOnly, vendors }) => {
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
                console.log("values - >", values)
                if (id) {
                    onSave({ ...values, isActive: status })
                } else {
                    // const formValues = { ...values}
                    onSave(values)
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
                                        id="driverName"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        placeholder="Driver name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="License Number"
                                        name="licenseNumber"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="licenseNumber"
                                        placeholder="License Number"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Cnic Number"
                                        name="cnicNumber"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        disabled={readOnly ? true : false}
                                        type="text"
                                        id="cnic"
                                        placeholder="42101xxxxxxxx"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label="Select Vendor"
                                        fullWidth={true}
                                        name="vendorId"
                                        id="vendor"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {vendors?.map((vendor) => (
                                            <MenuItem value={vendor._id} key={vendor._id}>{vendor.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        name="phone"
                                        InputLabelProps={{ shrink: true }}
                                        type="text"
                                        disabled={readOnly ? true : false}
                                        id="phone"
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
                                                        console.log(ev.target.checked)
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

const mapStateToProps = (state) => ({
    vendors: state.vendors.vendors
})

export default connect(mapStateToProps)(AddDriver)
