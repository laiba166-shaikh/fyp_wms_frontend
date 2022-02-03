import React, { useState, useEffect } from 'react'
import { TextInput } from '../../../controls';
import { DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { Formik, Form } from 'formik';
import Loader from '../../../components/Loader';
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'warehouse name should be greater than equal to 3 characters')
        .required('warehouse Name is required'),
    address: yup
        .string()
        .min(3, 'Address should be greater than equal to 3 characters')
        .required('Address is required'),
    city: yup
        .string()
        .min(3, 'city name should be gretaer than equal to 3 characters')
        .required(),
    businessWarehouseCode: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Warehouse code is required"),
});


const AddWarehouse = ({ initialValues, onClose, id, loading, onSave }) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) {
            setStatus(initialValues.isActive)
        }
    }, [initialValues])
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("values -> ", values)
                if (!id) {
                    onSave(values)
                }else {
                    const formValues={...values,isActive:status}
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
                                        label="Warehouse Name"
                                        name="name"
                                        id="warehouseName"
                                        defaultValue=" "
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Warehouse name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Address"
                                        name="address"
                                        fullWidth={true}
                                        type="text"
                                        defaultValue=" "
                                        id="warehouseAddress"
                                        placeholder="Warehouse Address"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="City"
                                        fullWidth={true}
                                        name="city"
                                        type="text"
                                        defaultValue=" "
                                        id="city"
                                        placeholder="city"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Warehouse code"
                                        fullWidth={true}
                                        name="businessWarehouseCode"
                                        type="text"
                                        defaultValue=" "
                                        id="warehouse-code"
                                        placeholder="W-001"
                                    />
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

export default AddWarehouse;
