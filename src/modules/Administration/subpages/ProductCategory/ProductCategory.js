import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import ProductCategoryEditDialog from './ProductCategoryEditDialog';
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

const ProductCategory = () => {
    const navigate=useNavigate();

    const [productCategoryEditOpen,setProductCategoryEditOpen]=useState(true)
    const [showProductCategoryDelete,setShowProductCategoryDelete]=useState(false)
    const onProductCategoryEditClose=()=>{
        setProductCategoryEditOpen(false)
        navigate(`/main/admin/product-category`)
    }
    const handelProductCategoryEditOpen=()=>setProductCategoryEditOpen(true)
    const handleProductCategoryDeleteClose=()=>setShowProductCategoryDelete(false)
    const handleProductCategoryDeleteOpen=()=>setShowProductCategoryDelete(true)

    const UserUiEvents={
        addNewProductCategoryClick:()=>{
            navigate(`/main/admin/product-category/new`)
            setProductCategoryEditOpen(true)
        },
        editProductCategoryClick:(id)=>{
            navigate(`/main/admin/product-category/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setProductCategoryEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,name:"ProductCategory A",isActive:true},
        {id:2,name:"ProductCategory B",isActive:false},
        {id:3,name:"ProductCategory C",isActive:true},
        {id:4,name:"ProductCategory C",isActive:true},
        {id:5,name:"ProductCategory C",isActive:true},
        {id:6,name:"ProductCategory C",isActive:true},
        {id:7,name:"ProductCategory C",isActive:true},
        {id:8,name:"ProductCategory C",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelProductCategoryEditOpen} onDelete={handleProductCategoryDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Product Category
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewProductCategoryClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleProductCategoryDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<ProductCategoryEditDialog show={productCategoryEditOpen} onClose={onProductCategoryEditClose} />} />
                        <Route path=":id/edit" element={<ProductCategoryEditDialog show={productCategoryEditOpen} onClose={onProductCategoryEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showProductCategoryDelete}
                        handleClose={handleProductCategoryDeleteClose}
                        entityName={"Product Category"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ProductCategory;
