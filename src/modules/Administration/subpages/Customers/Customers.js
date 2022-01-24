import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import CustomerEditDialog from './CustomerEditDialog';
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

const Customers = () => {
    const navigate=useNavigate();

    const [customerEditOpen,setCustomerEditOpen]=useState(true)
    const [showCustomerDelete,setShowCustomerDelete]=useState(false)
    const onCustomerEditClose=()=>{
        setCustomerEditOpen(false)
        navigate(`/main/admin/customers`)
    }
    const handelCustomerEditOpen=()=>setCustomerEditOpen(true)
    const handleCustomerDeleteClose=()=>setShowCustomerDelete(false)
    const handleCustomerDeleteOpen=()=>setShowCustomerDelete(true)

    const UserUiEvents={
        addNewCustomerClick:()=>{
            navigate(`/main/admin/customers/new`)
            setCustomerEditOpen(true)
        },
        editCustomerClick:(id)=>{
            navigate(`/main/admin/customer/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setCustomerEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,type:"Exporter",name:"Customer A",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:2,type:"Manufacturer",name:"Customer B",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:false},
        {id:3,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:4,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:5,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:6,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:7,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:8,type:"Importer",name:"Customer C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'type', label: 'Type', align: 'center' },
        { id: 'phone', label: 'Phone Number', align: 'center' },
        { id: 'notes', label: 'Notes', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelCustomerEditOpen} onDelete={handleCustomerDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Customer
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewCustomerClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleCustomerDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<CustomerEditDialog show={customerEditOpen} onClose={onCustomerEditClose} />} />
                        <Route path=":id/edit" element={<CustomerEditDialog show={customerEditOpen} onClose={onCustomerEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showCustomerDelete}
                        handleClose={handleCustomerDeleteClose}
                        entityName={"Customer"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Customers;
