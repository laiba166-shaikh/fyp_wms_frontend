import React from 'react';
import { Typography, makeStyles, Grid, Box, Button, MenuItem } from '@material-ui/core';
import { DeleteOutline } from "@material-ui/icons"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TextInput, Select } from '../../../../controls';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';
import { getAllCompanies } from '../../../../redux/Company/CompanyActions';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
        color: "#fff",
        padding: theme.spacing(2, 4),
    },
    prodList: {
        margin: theme.spacing(2, 0),
        color: "rgba(255,255,255,0.5)",
        paddingRight: theme.spacing(10)
    },
    listItem: {
        padding: theme.spacing(1)
    }
}))

const AddOrder = () => {
    const classes = useStyles()
    const navigate=useNavigate()
    return (
        <Grid item className={classes.root} md={12} xs={12}>
            <PageHeader
                // title={`${params.id ? readOnly ? "View" : "Edit" : "Add"} Product Inward`}
                title="Add Order"
                buttonTitle="Cancel"
                headerAction={() => navigate("/main/operations/dispatch-order")}
            />
        </Grid>
    )
};

export default AddOrder;