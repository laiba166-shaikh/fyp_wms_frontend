import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import ProductUploadEditDialog from './ProductUploadEditDialog';
import DeleteModal from '../../modals/DeleteModal';

const useStyles=makeStyles((theme)=>({
    root:{
        width:"100%",
        height:"100%",
        overflowX:"hidden",
        overflowY:"auto",
        backgroundColor:theme.palette.primary.dark,
        boxSizing:"border-box",
    },
    container:{
        backgroundColor:"transparent",
        height:"100%",
        color:"#fff",
        padding:theme.spacing(2)
    },
    header:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        margin:"10px 0px"
    }
}))

const ProductUpload = () => {
    const navigate=useNavigate();

    const [productUploadEditOpen,setProductUploadEditOpen]=useState(true)
    const [showProductUploadDelete,setShowProductUploadDelete]=useState(false)
    const onProductUploadEditClose=()=>{
        setProductUploadEditOpen(false)
        navigate(`/main/admin/product-upload`)
    }
    const handleProductUploadDeleteClose=()=>setShowProductUploadDelete(false)
    const handleProductUploadDeleteOpen=()=>setShowProductUploadDelete(true)

    const ProductUploadUiEvents={
        addNewProductUploadClick:()=>{
            navigate(`/main/admin/product-upload/new`)
            setProductUploadEditOpen(true)
        },
        editProductUploadClick:(id)=>{
            navigate(`/main/admin/product-upload/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setProductUploadEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,volume:0,name:"Product A",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:2,volume:0,name:"Product B",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:false},
        {id:3,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:4,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:5,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:6,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:7,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
        {id:8,volume:0,name:"Product C",description:"lorem ipsum dolor sit amet,consectetur",weight:0,category:"Category A",brand:"Brand A",uom:"UOM A",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'description', label: 'Description', align: 'center' },
        { id: 'volume', label: 'Volume', align: 'center' },
        { id: 'weight', label: 'Weight', align: 'center' },
        { id: 'category', label: 'Category', align: 'center' },
        { id: 'brand', label: 'Brand', align: 'center' },
        { id: 'uom', label: 'UOM', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={ProductUploadUiEvents.editProductUploadClick} onDelete={handleProductUploadDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Product Upload
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>ProductUploadUiEvents.addNewProductUploadClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<ProductUploadEditDialog show={productUploadEditOpen} onClose={onProductUploadEditClose} />} />
                        <Route path=":id/edit" element={<ProductUploadEditDialog show={productUploadEditOpen} onClose={onProductUploadEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showProductUploadDelete}
                        handleClose={handleProductUploadDeleteClose}
                        entityName={"Product Upload"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ProductUpload;
