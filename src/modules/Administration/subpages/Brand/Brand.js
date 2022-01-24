import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import BrandEditDialog from './BrandEditDialog';
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

const Brands = () => {
    const navigate=useNavigate();

    const [brandEditOpen,setBrandEditOpen]=useState(true)
    const [showBrandDelete,setShowBrandDelete]=useState(false)
    const onBrandEditClose=()=>{
        setBrandEditOpen(false)
        navigate(`/main/admin/brand`)
    }
    const handelBrandEditOpen=()=>setBrandEditOpen(true)
    const handleBrandDeleteClose=()=>setShowBrandDelete(false)
    const handleBrandDeleteOpen=()=>setShowBrandDelete(true)

    const UserUiEvents={
        addNewBrandClick:()=>{
            navigate(`/main/admin/brand/new`)
            setBrandEditOpen(true)
        },
        editBrandClick:(id)=>{
            navigate(`/main/admin/brand/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setBrandEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,name:"Brand A",manufacturerName:"Amigos",isActive:true},
        {id:2,name:"Brand B",manufacturerName:"Amigos",isActive:false},
        {id:3,name:"Brand C",manufacturerName:"Amigos",isActive:true},
        {id:4,name:"Brand C",manufacturerName:"Amigos",isActive:true},
        {id:5,name:"Brand C",manufacturerName:"Amigos",isActive:true},
        {id:6,name:"Brand C",manufacturerName:"Amigos",isActive:true},
        {id:7,name:"Brand C",manufacturerName:"Amigos",isActive:true},
        {id:8,name:"Brand C",manufacturerName:"Amigos",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'manufacturerName', label: 'Manufacturer', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelBrandEditOpen} onDelete={handleBrandDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Brand
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewBrandClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleBrandDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} />
                        <Route path=":id/edit" element={<BrandEditDialog show={brandEditOpen} onClose={onBrandEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showBrandDelete}
                        handleClose={handleBrandDeleteClose}
                        entityName={"Brand"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Brands;
