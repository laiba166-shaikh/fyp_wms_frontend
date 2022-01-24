import React from 'react'
import { TextInput, Select } from '../../../controls';
import { MenuItem, DialogContent, DialogActions, Button, Grid } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
    productCategoryName: yup
        .string()
        .min(5, 'ProductCategory name should be greater than equal to 3 characters')
        .required('ProductCategory Name is required'),
    productCategoryType: yup
        .string()
        .min(5, 'ProductCategory type should be greater than equal to 3 characters')
        .required('ProductCategory type is required'),
    notes: yup
        .string()
        .min(5, 'Notes should be gretaer than equal to 5 characters'),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    status: yup.boolean().required("status is required")
});


const AddProductCategory = ({ initialValues, onClose, id }) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("values -> ", values)
            }}
        >
            {({ handleSubmit, errors, values, touched }) => (
                <>
                    <DialogContent>
                        <Form>
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="ProductCategory Name"
                                        name="productCategoryName"
                                        id="productCategoryName"
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Product Category name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="ProductCategory Type"
                                        name="productCategoryType"
                                        fullWidth={true}
                                        type="text"
                                        id="productCategoryType"
                                        placeholder="Product Category Type"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Notes"
                                        fullWidth={true}
                                        name="notes"
                                        type="text"
                                        id="notes"
                                        placeholder="Add Notes"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        name="phone"
                                        type="text"
                                        id="phone"
                                        placeholder="+92 1342 122"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label="Select Status"
                                        fullWidth={true}
                                        name="status"
                                        id="select-status"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>Not Active</MenuItem>
                                    </Select>
                                </Grid>
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

export default AddProductCategory;
