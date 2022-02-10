import React, { useEffect } from 'react';
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
            color:"rgba(255,255,255,0.5)"
        },
    },
    input:{
        color:"rgba(255,255,255,0.5)"
    }
}))

const Select = ({...resProps}) => {
    const classes = useStyes();
    const [field, meta] = useField(resProps);

    //iNPUT lABEL id AND Select labelId should be same
    return (
        <TextField
        {...field}
            {...resProps}
            variant="filled"
            select={true}
            size="small"
            className={classes.root}
            margin='normal'
            sx={{ width: "130px" }}
            inputProps={{className:classes.input}}
            error={meta.touched &&  Boolean(meta.error)}
            helperText={meta.touched && meta.error }
        /> 
    )
};

export default Select;