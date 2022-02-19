import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Button, MenuItem, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyWarehouseProductInventory, getCompanyWarehouseProducts } from '../redux/DispatchOrder/DispatchOrderActions';
import { getAllProducts } from '../redux/ProductUpload/ProductUploadActions';
import { getAllInventories } from '../redux/Inventory/InventoryActions';
import { setIn } from 'formik';

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

    const [quantity, setQuantity] = useState();
    const [productId, setProductId] = useState("")
    const [warehouseProducts, setWarehouseProducts] = useState([])
    const [selectedProductInventory, setSelectedProductInventory] = useState({ inventory: "", product: "" })
    const [invalidQuantity,setInvalidQuantity]=useState("")

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

    const handleChangeQuantity=(quantity)=>{
        setQuantity(quantity)
        if (quantity > selectedProductInventory.inventory.availableQuantity) {
            setInvalidQuantity("Quantity should not be greater than available quantity")
            return;
        }else if(quantity<=0){
            setInvalidQuantity("Invalid Quantity")
            return;
        }
        setInvalidQuantity("")
    }

    const handleAddProductSubmit = () => {
        if (!quantity || quantity > selectedProductInventory.inventory.availableQuantity) {
            console.log("quantity should be provided with a defined value")
            return;
        }
        addValues({
            product: selectedProductInventory.product,
            inventory:selectedProductInventory.inventory,
            quantity: quantity,
        })
        setSelectedProductInventory({})
        setProductId("")
        setQuantity("")
    }

    return (
        <Grid container spacing={2} xs={12}>
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
                    type="number"
                    name="quantity"
                    {...inputProps}
                    disabled={productId ? false : true}
                    inputProps={{ className: classes.input, inputMode: 'numeric', pattern: '[0-9]*' }}
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(parseInt(e.target.value))}
                    error={Boolean(invalidQuantity)}
                    helperText={invalidQuantity}
                />
                {/* {invalidQuantity && <div style={{fontSize:"12px",color:"#d32f2f",letterSpacing:"0.4px"}}>{invalidQuantity}</div>} */}
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
                <Button variant="contained" color="secondary" onClick={handleAddProductSubmit} fullWidth style={{marginTop:"18px"}}>
                    Add Product
                </Button>
            </Grid>
        </Grid>

    )
};

export default AddOrderProductForm;
