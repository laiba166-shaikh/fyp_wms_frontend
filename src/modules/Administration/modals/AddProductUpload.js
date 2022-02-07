import React, { useState, useEffect } from 'react'
import { TextInput, Select } from '../../../controls';
import { MenuItem, DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox, Typography } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Product name should be greater than equal to 3 characters')
        .required('Product Name is required'),
    description: yup
        .string()
        .min(3, 'Description should be greater than equal to 3 characters')
        .required('Product Description is required'),
    volume: yup
        .number().positive().integer()
        .required("volume is required"),
    weight: yup
        .number().positive().integer()
        .required("weight is required"),
    categoryId: yup.
        string().
        required("Prodcut must have a category"),
    brandId: yup.
        string().
        required("Prodcut must have a Brand"),
    uomId: yup.
        string().
        required("Prodcut must have a defined unit of measurement"),

});


const AddProductUpload = ({ initialValues, onClose, id, loading, onSave, categories, brands, uoms, readOnly }) => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (id) setStatus(initialValues.isActive)
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
                                        label="Product Name"
                                        name="name"
                                        id="productName"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth={true}
                                        type="text"
                                        disabled={readOnly ? true : false}
                                        placeholder="Product name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Description"
                                        name="description"
                                        fullWidth={true}
                                        InputLabelProps={{ shrink: true }}
                                        type="text"
                                        disabled={readOnly ? true : false}
                                        id="ProductUploadDesc"
                                        placeholder="Product Description"
                                    />
                                </Grid>
                                <Grid item container md={12} sm={12} >
                                    <Grid item md={6} sm={12}>
                                        <TextInput
                                            label="Volume"
                                            name="volume"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            disabled={readOnly ? true : false}
                                            id="volume"
                                            placeholder="Volume"
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={12}>
                                        <TextInput
                                            label="Weight"
                                            name="weight"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            disabled={readOnly ? true : false}
                                            id="weight"
                                            placeholder="Weight"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label={readOnly ? "Category" : "Select Category"}
                                        fullWidth={true}
                                        name="categoryId"
                                        disabled={readOnly ? true : false}
                                        id="Product-Category"
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label={readOnly ? "Brand" : "Select Brand"}
                                        fullWidth={true}
                                        name="brandId"
                                        id="Product-Brand"
                                        disabled={readOnly ? true : false}
                                        value={initialValues.brandId}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {brands?.map((brand) => (
                                            <MenuItem key={brand._id} value={brand._id} id={brand._id}>
                                                {brand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label={readOnly ? "Unit of measure" : "Select Unit of measure"}
                                        fullWidth={true}
                                        name="uomId"
                                        id="Product-Uom"
                                        disabled={readOnly ? true : false}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {uoms?.map((uom) => (
                                            <MenuItem key={uom._id} value={uom._id}>{uom.name}</MenuItem>
                                        ))}
                                    </Select>
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
                                    readOnly && <Typography variant='body' style={{ color: "rgba(255,255,255,0.5)", margin:"4px" }}>
                                        {status?"Active":"In Active"}
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

export default AddProductUpload;
