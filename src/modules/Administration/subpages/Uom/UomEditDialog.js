import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddUom from '../../modals/AddUom';

const useStyles=makeStyles((theme)=>({
    root:{
        "& .MuiDialog-paper":{
            backgroundColor:theme.palette.primary.dark,
        },
    },
    formTitle:{
        borderBottom:"1px solid rgba(255,255,255,0.5)"
    }
}))
const UomEditDialog = ({show,onClose}) => {

    let params = useParams();
    console.log("params -> ",params,params.id);

    const classes=useStyles()

    const initialValues = {
        uomName: "",
        uomType: "",
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
                <Typography variant='h4' style={{color:"#fff"}}>
                {params.id ? "Edit" : "Add"} Uom
                </Typography>
            </DialogTitle>
            <AddUom
                initialValues={initialValues}
                onClose={onClose}
                id={params.id}
            />
      </Dialog>
    )
}

export default UomEditDialog;
