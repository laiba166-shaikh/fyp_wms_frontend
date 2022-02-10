import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Button, MenuItem, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/ProductUpload/ProductUploadActions';
import { getUom } from '../redux/Uom/UomActions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: "5px",
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
        "& .MuiFormLabel-root": {
            color: "rgba(255,255,255,0.5)"
        },
    },
    input: {
        color: "rgba(255,255,255,0.5)"
    }
}))

const AddProductInwardForm = ({ addValues }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const inputProps = {
        fullWidth: true,
        variant: "filled",
        size: "small",
        margin: 'normal',
        className: classes.root
    }

    const [addProductData, setAddProductData] = useState([])
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("")
    const [uom, setUom] = useState({})

    useEffect(() => {
        dispatch(getAllProducts("", ""))
    }, [dispatch])

    const { products } = useSelector((state) => ({
        products: state.products.products
    }))

    useEffect(() => {
        if (products.length) {
            const Data = products?.map((prod) => ({ uomId: prod.uomId, productId: prod._id, name: prod.name }))
            setAddProductData([...Data])
        }
    }, [products])

    const handleProductSelect = (e) => {
        setProductId(e.target.value)
        setQuantity("")
        const selectUom = addProductData.find((pr) => pr.productId === e.target.value)
        dispatch(getUom(selectUom.uomId)).then((res) => {
            console.log("uom -> ",res)
            setUom({ ...res })
        }).catch((err) => {
            console.log("error get in uom")
        })
    }

    const handleAddProductSubmit = () => {
        if(!quantity || quantity <= 0) {
            console.log("quantity should be provided with a defined value")
            return;
        }
        addValues({
            product: {...products.find((prod)=>prod._id === productId),uomId: uom},
            quantity: quantity,
        })
        setUom({})
        setProductId("")
        setQuantity("")
    }

    return (
        <Grid container spacing={2} xs={12} alignItems="center">
            <Grid item xs={12} md={4}>
                <TextField
                    label="Select Product"
                    placeholder='Select Product'
                    select={true}
                    name="id"
                    {...inputProps}
                    id="inwardProducts"
                    inputProps={{ className: classes.input }}
                    value={productId}
                    onChange={handleProductSelect}
                >
                    {products?.map((product) => (
                        <MenuItem value={product._id} key={product._id}>
                            {product.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    label="Enter Quantity"
                    name="quantity"
                    type="text"
                    id="quantity"
                    name="quantity"
                    {...inputProps}
                    disabled={productId ? false : true}
                    inputProps={{ className: classes.input, inputMode: 'numeric', pattern: '[0-9]*' }}
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    label="Uom"
                    name="uom"
                    type="text"
                    id="uom"
                    name="quantity"
                    {...inputProps}
                    disabled={true}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: productId ? true : false }}
                    placeholder="uom"
                    value={uom?.name}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button variant="contained" color="secondary" onClick={handleAddProductSubmit} fullWidth style={{ marginTop: 10 }}>
                    Add Product
                </Button>
            </Grid>
        </Grid>

    )
};

export default AddProductInwardForm;
