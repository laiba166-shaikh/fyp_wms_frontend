import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';

const useStyes=makeStyles((theme)=>({
    root:{
        "& .MuiInputBase-root":{
            minWidth:"220px",
        }
    }
}))

const Select = (props) => {
    const [field, meta] = useField(props);
    const classes = useStyes();

    //iNPUT lABEL id AND Select labelId should be same
    return (
        <TextField
            {...props}
            variant="outlined"
            select={true}
            size="small"
            {...field}
            className={classes.root}
            color="secondary"
            margin='normal'
            sx={{ width: "130px" }}
            error={meta.touched &&  Boolean(meta.error)}
            helperText={meta.touched && meta.error }
        /> 
    )
};

export default Select;