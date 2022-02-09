import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Button, MenuItem, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/ProductUpload/ProductUploadActions';
import { getAllInventories } from '../redux/Inventory/InventoryActions';
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

const AddOrderProductForm = ({ addValues }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const inputProps = {
        fullWidth: true,
        variant: "filled",
        size: "small",
        margin: 'normal',
        className: classes.root
    }

    const [productsInventoryData, setProductsInventoryData] = useState([])
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("")
    const [selectedProductInventory, setSelectedProductInventory] = useState({})

    useEffect(() => {
        dispatch(getAllProducts("", ""))
        dispatch(getAllInventories("",""))
    }, [dispatch])

    const { products, inventories } = useSelector((state) => ({
        products: state.products.products,
        inventories: state.inventories.inventories
    }))

    useEffect(() => {
        if (inventories.length) {
            const Data = inventories?.map((inventory) => ({ product: inventory.Product, availableQuantity: inventory.availableQuantity }))
            setProductsInventoryData([...Data])
        }
    }, [inventories])

    const handleProductSelect = (e) => {
        setProductId(e.target.value)
        setQuantity("")
        const selectProd = productsInventoryData.find((pr) => pr.product._id === e.target.value)
        setSelectedProductInventory({...selectProd})
    }

    const handleAddProductSubmit = () => {
        if(!quantity || quantity >= selectedProductInventory.availableQuantity) {
            console.log("quantity should be provided with a defined value")
            return;
        }
        console.log("dispatch order -> ",selectedProductInventory)
        addValues({
            product: selectedProductInventory.product,
            quantity: quantity,
        })
        setSelectedProductInventory({})
        setProductId("")
        setQuantity("")
    }

    return (
        <Grid container spacing={2} xs={12} alignItems="center">
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={2}>
                <TextField
                    label="Available Quantity"
                    name="availableQuantity"
                    type="text"
                    id="availableQuantity"
                    {...inputProps}
                    disabled={true}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: productId ? true : false }}
                    value={selectedProductInventory?.availableQuantity}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Uom"
                    name="uom"
                    type="text"
                    id="uom"
                    {...inputProps}
                    disabled={true}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: productId ? true : false }}
                    value={selectedProductInventory?.product?.uomId.name }
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

export default AddOrderProductForm;
