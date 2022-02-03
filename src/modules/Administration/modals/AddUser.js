import React, { useEffect, useState } from 'react'
import { TextInput, Select } from '../../../controls';
import { MenuItem, DialogContent, DialogActions, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import Loader from '../../../components/Loader';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(3, 'firstName should be less than equal to 3 characters')
        .required('First Name is required'),
    lastName: yup
        .string()
        .min(3, 'lastName should be less than equal to 3 characters')
        .required('Last Name is required'),
    username: yup
        .string()
        .min(3, 'userName should be less than equal to 3 characters')
        .required('User Name is required'),
    password: yup.string().max(50, ""),
    email: yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("email is required"),
    phone: yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    roleId: yup.string().required("role is required")
});


const AddUser = ({ user, onClose, id, onSave, loading }) => {
    console.log("edit ->", user)
    const [status, setStatus] = useState(false)

    useEffect(() => setStatus(user.isActive), [user])

    return (
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                if (id) {
                    // const {role,...updatedValues}=values
                    onSave({ ...values, isActive: status })
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
                                        label="First Name"
                                        name="firstName"
                                        id="firstName"
                                        fullWidth={true}
                                        defaultValue=" "
                                        // type="text"
                                        placeholder="First name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Last Name"
                                        name="lastName"
                                        fullWidth={true}
                                        defaultValue=" "
                                        // type="text"
                                        id="lastName"
                                        placeholder="Last name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="User Name"
                                        fullWidth={true}
                                        name="username"
                                        defaultValue=" "
                                        // type="text"
                                        id="username"
                                        placeholder="User name"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Change Password"
                                        fullWidth={true}
                                        name="password"
                                        defaultValue=""
                                        type="password"
                                        id="password"
                                        placeholder="Change Password"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Email"
                                        fullWidth={true}
                                        name="email"
                                        defaultValue=" "
                                        // type="text"
                                        id="email"
                                        placeholder="user@gmail.com"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Select
                                        label="Select Role"
                                        fullWidth={true}
                                        name="roleId"
                                        id="role"
                                    >
                                        {/* <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem> */}
                                        <MenuItem value="61f4f16013d61b753b91f69a">Super Admin</MenuItem>
                                        <MenuItem value="61f4f16013d61b753b91f69b">Admin</MenuItem>
                                        <MenuItem value="61f4f16013d61b753b91f69c">Customer Super Admin</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextInput
                                        label="Phone Number"
                                        fullWidth={true}
                                        name="phone"
                                        defaultValue=" "
                                        // type="text"
                                        id="phone"
                                        placeholder="+92 1342 122"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
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
