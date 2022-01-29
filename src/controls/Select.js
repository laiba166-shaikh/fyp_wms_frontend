import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { useField } from 'formik';

const useStyes=makeStyles((theme)=>({
    root:{
        "& .MuiInputBase-root":{
            minWidth:"220px",
        },
        '& .MuiOutlinedInput-root': {
            borderRadius:"5px",
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#d9d9d9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#d9d9d9',
            },
        },
        "& .MuiFormLabel-root":{
            color:"#fff"
        },
    },
    input:{
        color:"rgba(255,255,255,0.5)"
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
            // color="secondary"
            margin='normal'
            sx={{ width: "130px" }}
            inputProps={{className:classes.input}}
            error={meta.touched &&  Boolean(meta.error)}
            helperText={meta.touched && meta.error }
        /> 
    )
};

export default Select;