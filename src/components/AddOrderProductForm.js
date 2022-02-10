import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Button, MenuItem, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyWarehouseProductInventory, getCompanyWarehouseProducts } from '../redux/DispatchOrder/DispatchOrderActions';
import { getAllProducts } from '../redux/ProductUpload/ProductUploadActions';
import { getAllInventories } from '../redux/Inventory/InventoryActions';

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

const AddOrderProductForm = ({ addValues, companyId, warehouseId }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const inputProps = {
        fullWidth: true,
        variant: "filled",
        size: "small",
        margin: 'normal',
        className: classes.root
    }

    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("")
    const [warehouseProducts, setWarehouseProducts] = useState([])
    const [selectedProductInventory, setSelectedProductInventory] = useState({ inventory: "", product: "" })

    useEffect(() => {
        if (companyId && warehouseId) {
            dispatch(getCompanyWarehouseProducts(companyId, warehouseId)).then((res) => {
                setWarehouseProducts([...res])
            }).catch((err) => console.log("error"))
        }
    }, [dispatch, companyId, warehouseId])


    const handleProductSelect = (e) => {
        const clickedProdId = e.target.value
        setProductId(clickedProdId)
        setQuantity("")
        dispatch(getCompanyWarehouseProductInventory(companyId, warehouseId, clickedProdId))
            .then((res) => {
                const selectedProduct = warehouseProducts.find((prod) => prod._id === clickedProdId)
                setSelectedProductInventory({ inventory: { ...res }, product: selectedProduct })
            }).catch((err) => console.log("inventory get error"))
    }

    const handleAddProductSubmit = () => {
        if (!quantity || quantity >= selectedProductInventory.inventory.availableQuantity) {
            console.log("quantity should be provided with a defined value")
            return;
        }
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
                    inputProps={{ className: classes.input }}
                    value={productId}
                    onChange={handleProductSelect}
                    disabled={!(companyId && warehouseId) ? true : false}
                >
                    {warehouseProducts?.map((product) => (
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
                    {...inputProps}
                    disabled={true}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: productId ? true : false }}
                    value={selectedProductInventory?.inventory?.availableQuantity}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Uom"
                    name="uom"
                    type="text"
                    {...inputProps}
                    disabled={true}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: productId ? true : false }}
                    value={selectedProductInventory?.product?.uomId?.name}
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
