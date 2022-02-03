import React from 'react';
import {TextField,makeStyles} from '@material-ui/core';
import { useField } from 'formik';

const useStyes=makeStyles((theme)=>({
    root:{
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

const MyTextInput = (props) => {

    const [field, meta] = useField(props);
    const classes = useStyes();

    return (
        <TextField
            {...props}
            variant="filled"
            size="small"
            {...field}
            className={classes.root}
            margin='normal'
            inputProps={{className:classes.input}}
            error={meta.touched &&  Boolean(meta.error)}
            helperText={meta.touched && meta.error }
        />
    )
}

export default MyTextInput
