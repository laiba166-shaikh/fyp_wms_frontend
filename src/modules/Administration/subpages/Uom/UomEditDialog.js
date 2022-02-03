import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddUom from '../../modals/AddUom';
import { getUom, createUom, updateUom } from "../../../../redux/Uom/UomActions";

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

    const classes=useStyles()
    const dispatch=useDispatch()

    const initialValues = {
        name: "",
    }

    const [uom, setUom] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getUom(params.id)).then((res) => {
                setUom({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("brand did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save Employee function if(id) { edit }else { create }  
    const saveUom = (uom) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateUom(uom)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating uom")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createUom(uom)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating uom")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{color:"#fff"}}>
                {params.id ? "Edit" : "Add"} Uom
                </Typography>
            </DialogTitle>
            <AddUom
                initialValues={uom || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveUom}
            />
      </Dialog>
    )
}

export default UomEditDialog;
