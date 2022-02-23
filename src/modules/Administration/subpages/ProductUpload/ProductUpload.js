import React, {useState} from 'react'
import { makeStyles,Grid,Paper} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import PageHeader from "../../../../components/PageHeader";
import ProductUploadEditDialog from './ProductUploadEditDialog';
import { getAllProducts } from '../../../../redux/ProductUpload/ProductUploadActions';
import { connect } from 'react-redux';

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

const ProductUpload = ({products,totalCount,getAllProducts}) => {
    const navigate=useNavigate();
    const classes=useStyles();

    const [view,setView]=useState(false)
    const [productUploadEditOpen,setProductUploadEditOpen]=useState(true)
    const onProductUploadEditClose=()=>{
        setProductUploadEditOpen(false)
        setView(false)
        navigate(`/main/admin/product-upload`)
    }
  
    const handleViewOnly=(id)=>{
        setView(true)
        ProductUploadUiEvents.editProductUploadClick(id)
    }

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

    const columns = [
        { id: '_id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'description', label: 'Description', align: 'center' },
        { id: 'volume', label: 'Volume', align: 'center' },
        { id: 'weight', label: 'Weight', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={ProductUploadUiEvents.editProductUploadClick} onClickView={handleViewOnly} /> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <PageHeader
                        title='Product'
                        buttonTitle="Add New"
                        headerAction={() => ProductUploadUiEvents.addNewProductUploadClick()}
                    />
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={products}
                        fetchData={getAllProducts}
                    />
                    <Routes>
                        <Route path="new" element={<ProductUploadEditDialog show={productUploadEditOpen} onClose={onProductUploadEditClose} />} />
                        <Route path=":id/edit" element={<ProductUploadEditDialog show={productUploadEditOpen} onClose={onProductUploadEditClose} view={view} />} />  
                    </Routes>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps=(state)=>({
    products:state.products.products,
    totalCount:state.products.totalCount
})

const actions = {
    getAllProducts
}

export default connect(mapStateToProps,actions)(ProductUpload);
