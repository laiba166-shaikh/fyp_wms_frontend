import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import AddProductUpload from '../../modals/AddProductUpload';
import { useDispatch, useSelector } from "react-redux"
import { getAllBrands } from '../../../../redux/Brand/BrandActions';
import { getAllCategory } from '../../../../redux/Category/CategoryActions';
import { getAllUoms } from '../../../../redux/Uom/UomActions';
import { getProduct, updateProduct, createProduct } from '../../../../redux/ProductUpload/ProductUploadActions';


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    formTitle: {
        borderBottom: "1px solid rgba(255,255,255,0.5)"
    }
}))
const ProductUploadEditDialog = ({ show, onClose, view = false }) => {

    let params = useParams();

    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        description: "",
        volume: 0,
        weight: 0,
        categoryId: "",
        brandId: "",
        uomId: ""
    }

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    //destructure redux state which is required
    const { categories, brands, uoms } = useSelector((state) => ({
        categories: state.categories.category,
        brands: state.brands.brands,
        uoms: state.uoms.uoms
    }))

    useEffect(() => {
        setLoading(true)
        dispatch(getAllCategory("", ""))
        dispatch(getAllBrands("", ""))
        dispatch(getAllUoms("", ""))
        Promise.all([categories, brands, uoms]).then((values) => {
            console.log("all promise resolve ", values)
            if (!params.id) {
                setLoading(false)
            }
        })

    }, [dispatch])

    // call fetchSingleRecord for data as initialValues
    useEffect(() => {
        if (params.id && (categories.length >= 1 && brands.length >= 1 && uoms.length >= 1)) {
            console.log("get", categories, brands, uoms)
            // setLoading(true)
            if (params.id) {
                dispatch(getProduct(params.id)).then((res) => {
                    setProduct({ ...res })
                    setLoading(false)
                }).catch((err) => {
                    console.log("product did not fetch")
                    setLoading(false)
                })
            }
        }
    }, [uoms])

    //save Employee function if(id) { edit }else { create }  
    const saveProduct = (product) => {
        if (params.id) {
            setLoading(true)
            dispatch(updateProduct(product)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error updating product")
                setLoading(false)
            })
        } else {
            setLoading(true)
            dispatch(createProduct(product)).then((res) => {
                setLoading(false)
                onClose()
            }).catch((err) => {
                console.log("error creating product")
                setLoading(false)
            })
        }
    }

    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" className={classes.root}>
            <DialogTitle className={classes.formTitle}>
                <Typography variant='h4' style={{ color: "#fff" }}>
                    {params.id ? view ? "View" : "Edit" : "Add"} Product
                </Typography>
            </DialogTitle>
            <AddProductUpload
                initialValues={(params.id && product._id) ? product : initialValues}
                onClose={onClose}
                id={params.id}
                loading={loading}
                onSave={saveProduct}
                categories={categories}
                brands={brands}
                uoms={uoms}
                readOnly={view}
            />
        </Dialog>
    )
}

export default ProductUploadEditDialog;
