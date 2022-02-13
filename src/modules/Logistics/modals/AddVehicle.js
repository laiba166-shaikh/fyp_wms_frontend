import React, { useState, useEffect } from 'react'
import { TextInput, Select } from '../../../controls';
import { DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, MenuItem } from "@material-ui/core"
import { Formik, Form } from 'formik';
import Loader from "../../../components/Loader";
import * as yup from "yup";

const validationSchema = yup.object({
    registrationNumber: yup
        .string()
        .min(3, 'Registration Number should be greater than equal to 3 characters')
        .required('Registration Number is required'),
    vendorId: yup.string().required("Vendor is required"),
    driverId: yup.string().required("Driver is required"),
    vehicleTypeId: yup.string().required("Vehicle Type is required"),
});


const AddVehicle = ({ initialValues, onClose, id, loading, onSave, drivers, vehicleTypes, vendors, readOnly }) => {

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
                                        label="Registration Number"
                                        name="registrationNumber"
                                        id="Vehicle"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        type="text"
                                        placeholder="qop-100"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label={readOnly ? "Vendor" : "Select Vendor"}
                                        fullWidth={true}
                                        name="vendorId"
                                        disabled={readOnly ? true : false}
                                        id="vendor"
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {vendors?.map((vendor) => (
                                            <MenuItem key={vendor._id} value={vendor._id}>{vendor.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={12} sm={12}>
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
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label={readOnly ? "Vehicle Type" : "Select Vehicle Type"}
                                        fullWidth={true}
                                        name="vehicleTypeId"
                                        id="Vehicle Type"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {vehicleTypes?.map((vehicleType) => (
                                            <MenuItem key={vehicleType._id} value={vehicleType._id}>{vehicleType.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                {
                                    id && <Grid item md={12} sm={12}>
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

export default AddVehicle;
