import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddProductUpload from '../../modals/AddProductUpload';

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
const ProductUploadEditDialog = ({show,onClose}) => {

    let params = useParams();
    console.log("params -> ",params,params.id);

    const classes=useStyles()

    const initialValues = {
        productUploadName: "",
        productUploadType: "",
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
                {params.id ? "Edit" : "Add"} Product
                </Typography>
            </DialogTitle>
            <AddProductUpload
                initialValues={initialValues}
                onClose={onClose}
                id={params.id}
            />
      </Dialog>
    )
}

export default ProductUploadEditDialog;
