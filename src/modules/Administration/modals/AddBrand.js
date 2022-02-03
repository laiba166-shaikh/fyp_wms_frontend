import React, {useState,useEffect} from 'react'
import { TextInput } from '../../../controls';
import { DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { Formik, Form } from 'formik';
import Loader from '../../../components/Loader';
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Brand name should be greater than equal to 3 characters')
        .required('Brand Name is required'),
    manufacturerName: yup
        .string()
        .min(3, 'Manufacturer should be greater than equal to 3 characters')
});


const AddBrand = ({ initialValues, onClose, id, onSave, loading }) => {

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
                                        label="Brand Name"
                                        name="name"
                                        id="brandName"
                                        defaultValue=" "
                                        fullWidth={true}
                                        type="text"
                                        placeholder="Brand name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Manufacturer Name"
                                        name="manufacturerName"
                                        fullWidth={true}
                                        defaultValue=" "
                                        type="text"
                                        id="manufacturer-name"
                                        placeholder="Manufacturer Name"
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

export default AddBrand;
