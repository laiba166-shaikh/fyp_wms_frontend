import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddVehicleType from '../../modals/AddVehicleType';
import { getVehicleType, createVehicleType, updateVehicleType } from "../../../../redux/VehicleType/VehicleTypeActions";

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
const VehicleTypeEditDialog = ({show,onClose}) => {

    let params = useParams();

    const classes=useStyles()
    const dispatch=useDispatch()

    const initialValues = {
        name: "",
    }

    const [vehicleType, setVehicleType] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getVehicleType(params.id)).then((res) => {
                setVehicleType({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("vehicle Types did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save Employee function if(id) { edit }else { create }  
    const saveVehicleType = (vehicleType) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateVehicleType(vehicleType)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating VehicleType")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createVehicleType(vehicleType)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating VehicleType")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{color:"#fff"}}>
                {params.id ? "Edit" : "Add"} Vehicle Type
                </Typography>
            </DialogTitle>
            <AddVehicleType
                initialValues={vehicleType || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveVehicleType}
            />
      </Dialog>
    )
}

export default VehicleTypeEditDialog;
