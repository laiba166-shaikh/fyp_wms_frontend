import React from 'react';
import { Dialog, DialogTitle,makeStyles, DialogContentText, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    root:{
        "& .MuiDialog-paper":{
            backgroundColor:"#e6e6e6",
        },
    },
    formTitle:{
        borderBottom:"1px solid rgba(0,0,0,0.5)"
    },
}))

const DeleteModal = ({ show, handleClose, entityName }) => {
    const classes=useStyles()
    return (
        <Dialog open={show} onClose={handleClose} className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4'>
                    Delete {entityName}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this record ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleClose} variant="contained" color="primary">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
