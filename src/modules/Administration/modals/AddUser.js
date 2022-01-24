import React from 'react'
import { TextInput, Select } from '../../../controls';
import { MenuItem, DialogContent, DialogActions, Button, Grid } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(5, 'firstName should be less than equal to 3 characters')
        .required('First Name is required'),
    lastName: yup
        .string()
        .min(5, 'lastName should be less than equal to 3 characters')
        .required('Last Name is required'),
    userName: yup
        .string()
        .min(5, 'userName should be less than equal to 5 characters')
        .required('User Name is required'),
    email: yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("email is required"),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    status: yup.boolean().required("status is required")
});


const AddUser = ({ initialValues, onClose, id }) => {

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
                                        label="First Name"
                                        name="firstName"
                                        id="firstName"
                                        fullWidth={true}
                                        type="text"
                                        placeholder="First name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Last Name"
                                        name="lastName"
                                        fullWidth={true}
                                        type="text"
                                        id="lastName"
                                        placeholder="Last name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="User Name"
                                        fullWidth={true}
                                        name="userName"
                                        type="text"
                                        id="userName"
                                        placeholder="User name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Email"
                                        fullWidth={true}
                                        name="email"
                                        type="text"
                                        id="email"
                                        placeholder="user@gmail.com"
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

export default AddUser
