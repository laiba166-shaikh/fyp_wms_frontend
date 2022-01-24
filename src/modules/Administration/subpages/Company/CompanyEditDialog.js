import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddCompany from '../../modals/AddCompany';

const useStyles=makeStyles((theme)=>({
    root:{
        "& .MuiDialog-paper":{
            backgroundColor:"#e6e6e6",
        },
    },
    formTitle:{
        borderBottom:"1px solid rgba(0,0,0,0.5)"
    }
}))
const CompanyEditDialog = ({show,onClose}) => {

    let params = useParams();
    console.log("params -> ",params,params.id);

    const classes=useStyles()

    const initialValues = {
        companyName: "",
        companyType: "",
        notes: "",
        phone: "",
        status: false
    }
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    //save Employee function if(id) { edit }else { create }  

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                {params.id ? "Edit" : "Add"} Company
                </Typography>
            </DialogTitle>
            <AddCompany
                initialValues={initialValues}
                onClose={onClose}
                id={params.id}
            />
      </Dialog>
    )
}

export default CompanyEditDialog;
