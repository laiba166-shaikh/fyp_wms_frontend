import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Dialog,DialogTitle,makeStyles,Typography} from '@material-ui/core';
import AddBrand from '../../modals/AddBrand';
import { getBrand, createBrand, updateBrand } from "../../../../redux/Brand/BrandActions";

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
const BrandEditDialog = ({show,onClose}) => {

    let params = useParams();

    const classes=useStyles()
    const dispatch=useDispatch()

    const initialValues = {
        name: "",
        manufacturerName: "",
    }

    const [brand, setBrand] = useState({})
    const [loading, setLoading] = useState(false)
    //destructure redux state which is required
    //call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id) {
            setLoading(true)
            dispatch(getBrand(params.id)).then((res) => {
                setBrand({ ...res })
                setLoading(false)
            }).catch((err) => {
                console.log("brand did not fetch")
                setLoading(false)
            })
        }
    }, [dispatch])
    //save Brand function if(id) { edit }else { create }  
    const saveBrand = (brand) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateBrand(brand)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating brand")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createBrand(brand)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating brand")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{color:"#fff"}}>
                {params.id ? "Edit" : "Add"} Brand
                </Typography>
            </DialogTitle>
            <AddBrand
                initialValues={brand || initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveBrand}
            />
      </Dialog>
    )
}

export default BrandEditDialog;
