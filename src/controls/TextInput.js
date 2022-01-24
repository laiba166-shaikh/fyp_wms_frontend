import React from 'react';
import {TextField,makeStyles} from '@material-ui/core';
import { useField } from 'formik';

const useStyes=makeStyles((theme)=>({
    root:{
        '& .MuiOutlinedInput-root': {
            borderRadius:"5px",
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',
            },
        },
        "& .MuiFormLabel-root":{
            color:"#000"
        },
    }
}))

const MyTextInput = (props) => {

    const [field, meta] = useField(props);
    const classes = useStyes();

    return (
        <TextField
            {...props}
            variant="outlined"
            size="small"
            {...field}
            className={classes.root}
            color="secondary"
            margin='normal'
            error={meta.touched &&  Boolean(meta.error)}
            helperText={meta.touched && meta.error }
        />
    )
}

export default MyTextInput
